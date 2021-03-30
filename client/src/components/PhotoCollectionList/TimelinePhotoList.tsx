import _ from "lodash";
import { Fragment, RefObject, useMemo, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from 'react-window';
import { listData } from ".";
import { Row } from "./Row";
import { PhotosByDate } from "../../models/Photo";
import { yearSummary, photoCollections } from "../../containers/YearsPage";

export const TimelinePhotoList = (props: { summaryView: boolean; photosByDates: PhotosByDate[]; onSelectYear: (year: string) => void; }) => {
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
                <Row {...props} onSelect={handleOnSelect} />
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
                <Row {...props} />
              )}
            </List>
          </div>
        </Fragment>
      )}
    </AutoSizer>
  );
};
