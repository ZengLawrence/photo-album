import _ from "lodash";
import { Fragment, RefObject, useMemo, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from 'react-window';
import { PhotoCollection, PhotosByDate } from "../../models";
import { KeyedPhotoCollection } from "./KeyedPhotoCollection";
import { listData } from "./listData";
import { getItemSize } from "./ListItemData";
import { PhotoListRow } from "./PhotoListRow";

function yearView(photosByDate: PhotosByDate[]) {
  const year = (photosByDate: PhotosByDate) => photosByDate.date.substring(0, 4);
  const photoCollection = (photosByDate: PhotosByDate[], year: string): PhotoCollection => ({
    title: year,
    photos: _.flatMap(photosByDate, 'photos'),
  });

  return _.map(_.groupBy(photosByDate, year), photoCollection);
}

function yearSummary(photosByDate: PhotosByDate[]): KeyedPhotoCollection[] {
  const sample = (photoCollection: PhotoCollection) => {
    const { title, photos } = photoCollection;
    return {
      title,
      photos: _.sampleSize(_.flatten(photos), 30),
      key: title,
    };
  };

  return _.map(yearView(photosByDate), sample);
}

function photoCollections(photosByDates: PhotosByDate[]): KeyedPhotoCollection[] {
  const photoCollection = (pbd: PhotosByDate) => ({
    title: pbd.date,
    photos: pbd.photos,
    key: pbd.date,
  });
  return _.map(photosByDates, photoCollection);
}

interface Props {
  summaryView: boolean;
  photosByDates: PhotosByDate[]; 
  onSelectYear: (year: string) => void;
}

export const TimelinePhotoList = (props: Props) => {
  const { summaryView, photosByDates, onSelectYear } = props;
  const yearSummaryItemData = useMemo(() => listData(yearSummary(photosByDates), 5),
    [photosByDates]);
  const getSummaryItemSize = (index: number) => getItemSize(yearSummaryItemData[index]);
  const dateItemData = useMemo(() => listData(photoCollections(photosByDates), 5),
    [photosByDates]);
  const getDateItemSize = (index: number) => getItemSize(dateItemData[index]);

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
              itemSize={getSummaryItemSize}
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
