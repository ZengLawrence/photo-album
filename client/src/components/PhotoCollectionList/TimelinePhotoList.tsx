import _ from "lodash";
import { Fragment, RefObject, useMemo, useRef } from "react";
import { VariableSizeList as List } from 'react-window';
import { PhotosByDate } from "../../models";
import { KeyedPhotoCollection } from "./KeyedPhotoCollection";
import { listData } from "./listData";
import { getItemSize } from "./ListItemData";
import { PhotoListRow } from "./PhotoListRow";
import { TimelineSummaryPhotoList } from "./TimelineSummaryPhotoList";

function photoCollections(photosByDates: PhotosByDate[]): KeyedPhotoCollection[] {
  const photoCollection = (pbd: PhotosByDate) => ({
    title: pbd.date,
    photos: pbd.photos,
    key: pbd.date,
  });
  return _.map(photosByDates, photoCollection);
}

interface Props {
  height: number;
  width: number;
  summaryView: boolean;
  photosByDates: PhotosByDate[];
  onSelectYear: (year: string) => void;
}

export const TimelinePhotoList = (props: Props) => {
  const { height, width, summaryView, photosByDates, onSelectYear } = props;
  const numbOfPhotosPerRow = Math.floor(width / 100);
  const dateItemData = useMemo(() => listData(photoCollections(photosByDates), numbOfPhotosPerRow),
    [photosByDates, numbOfPhotosPerRow]);
  const getDateItemSize = (index: number) => getItemSize(dateItemData[index]);

  const dateListRef = useRef() as RefObject<List>;
  const handleOnSelect = (key: string) => {
    onSelectYear(key);
    const index = _.findIndex(dateItemData, item => item.key.startsWith(key));
    dateListRef.current?.scrollToItem(index, "start");
  };

  return (
    <Fragment>
      <div>
        <TimelineSummaryPhotoList
          height={summaryView ? height : 0}
          width={summaryView ? width : 0}
          photosByDates={photosByDates}
          onSelectYear={handleOnSelect}
        />
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
  );
};
