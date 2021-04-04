import _ from "lodash";
import { useMemo } from "react";
import { VariableSizeList as List } from 'react-window';
import { PhotosByDate } from "../../models";
import { KeyedPhotoCollection } from "./KeyedPhotoCollection";
import { listData } from "./listData";
import { getItemSize } from "./ListItemData";
import { PhotoListRow } from "./PhotoListRow";

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
  photosByDates: PhotosByDate[];
  scrollToYear?: string;
}

export const TimelinePhotoList = (props: Props) => {
  const { height, width, photosByDates, scrollToYear } = props;

  const numbOfPhotosPerRow = Math.floor(width / 100);
  const dateItemData = useMemo(() => listData(photoCollections(photosByDates), numbOfPhotosPerRow),
    [photosByDates, numbOfPhotosPerRow]);
  const getDateItemSize = (index: number) => getItemSize(dateItemData[index]);

  const scrollToIndex = scrollToYear ? _.findIndex(dateItemData, item => item.key.startsWith(scrollToYear)) : 0;
  const initialScrollOffset = _.reduce(_.range(scrollToIndex), function(sum, i) {
    return sum + getDateItemSize(i);
  });

  return (
    <List
      height={height}
      width={width}
      itemCount={_.size(dateItemData)}
      itemSize={getDateItemSize}
      itemData={dateItemData}
      initialScrollOffset={initialScrollOffset}
    >
      {(props) => (
        <PhotoListRow {...props} />
      )}
    </List>
  );
};
