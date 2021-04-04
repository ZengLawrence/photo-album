import _ from "lodash";
import { useMemo } from "react";
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

interface TimelineSummaryPhotoListProps {
  height: number;
  width: number;
  photosByDates: PhotosByDate[];
  onSelectYear: (year: string) => void;
}

export const TimelineSummaryPhotoList = (props: TimelineSummaryPhotoListProps) => {
  const { height, width, photosByDates, onSelectYear } = props;
  const numbOfPhotosPerRow = Math.floor(width / 100);
  const yearSummaryItemData = useMemo(() => listData(yearSummary(photosByDates), numbOfPhotosPerRow),
    [photosByDates, numbOfPhotosPerRow]);
  const getSummaryItemSize = (index: number) => getItemSize(yearSummaryItemData[index]);

  return (
    <List
      height={height}
      width={width}
      itemCount={_.size(yearSummaryItemData)}
      itemSize={getSummaryItemSize}
      itemData={yearSummaryItemData}
      useIsScrolling
    >
      {(props) => (
        <PhotoListRow {...props} onSelect={onSelectYear} />
      )}
    </List>

  );
};
