import _ from "lodash";
import { Fragment, RefObject, useMemo, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from 'react-window';
import { photoCollections, yearSummary } from "../../containers/YearsPage";
import { PhotosByDate } from "../../models/Photo";
import { KeyedPhotoCollection } from "./KeyedPhotoCollection";
import { ListItemData } from "./ListItemData";
import { PhotoListRow } from "./PhotoListRow";

function listData(data: KeyedPhotoCollection[]): ListItemData[] {
  return _.flatten(_.map(data, listItemData));
}

// normalize PhotoCollection into a list item data
function listItemData(pc: KeyedPhotoCollection) {
  const titleItem: ListItemData = { title: pc.title, key: pc.key };
  const photoItems: ListItemData[] = _.map(_.chunk(pc.photos, 5), photos => ({ photos, key: pc.key }));
  return _.concat(titleItem, photoItems);
}

interface Props {
  summaryView: boolean;
  photosByDates: PhotosByDate[]; 
  onSelectYear: (year: string) => void;
}

export const TimelinePhotoList = (props: Props) => {
  const { summaryView, photosByDates, onSelectYear } = props;
  const yearSummaryItemData = useMemo(() => listData(yearSummary(photosByDates)),
    [photosByDates]);
  const getItemSize = (index: number) => (yearSummaryItemData[index].title ? 50 : 100);
  const dateItemData = useMemo(() => listData(photoCollections(photosByDates)),
    [photosByDates]);
  const getDateItemSize = (index: number) => (dateItemData[index].title ? 50 : 100);

  const dateListRef = useRef() as RefObject<List>;
  const handleOnSelect = (key: string) => {
    onSelectYear(key);
    const index = _.findIndex(dateItemData, item => item.key.startsWith(key));
    dateListRef.current?.scrollToItem(index, "start");
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Fragment>
          <div>
            <List
              height={summaryView ? height : 0}
              width={summaryView ? width : 0}
              itemCount={_.size(yearSummaryItemData)}
              itemSize={getItemSize}
              itemData={yearSummaryItemData}
              useIsScrolling
            >
              {(props) => (
                <PhotoListRow {...props} onSelect={handleOnSelect} />
              )}
            </List>
          </div>

          <div>
            <List
              ref={dateListRef}
              height={summaryView ? 0 : height}
              width={summaryView ? 0 : width}
              itemCount={_.size(dateItemData)}
              itemSize={getDateItemSize}
              itemData={dateItemData}
            >
              {(props) => (
                <PhotoListRow {...props} />
              )}
            </List>
          </div>
        </Fragment>
      )}
    </AutoSizer>
  );
};
