import _ from "lodash";
import { RefObject, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { VariableSizeList as List } from 'react-window';
import * as YearsAPI from "../api/Years";
import { KeyedPhotoCollection, listData, Row } from "../components/PhotoCollectionList";
import { PhotoCollection, PhotosByDate } from "../models/Photo";

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

interface Action {
  type: string,
}

interface LoadAction extends Action {
  type: "loaded",
  photosByDates: PhotosByDate[],
}

interface DateViewAction extends Action {
  type: "date_view",
  year: string,
}

function reducer(state: YearsPageState, action: Action) {
  switch (action.type) {
    case 'loaded':
      const { photosByDates } = action as LoadAction;
      return { ...state, loading: false, photosByDates };
    case 'date_view':
      const { year: scrollToYear } = action as DateViewAction;
      return { ...state, summaryView: false, scrollToYear };
    default:
      throw new Error();
  }
}

const LoadingSpinner = () => <Spinner animation="border" variant="primary" />;

interface YearsPageState {
  photosByDates: PhotosByDate[],
  loading: boolean,
  summaryView: boolean,
  scrollToYear?: string,
}

export const YearsPage = () => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      photosByDates: [],
      loading: true,
      summaryView: true,
    }
  )
  useEffect(() => {
    YearsAPI.fecthAll().then(data =>
      dispatch({ type: "loaded", photosByDates: data } as LoadAction)
    );
  }, []);


  const { photosByDates } = state;
  const yearSummaryItemData = useMemo(() => listData(yearSummary(photosByDates)),
    [photosByDates]);
  const getItemSize = (index: number) => (yearSummaryItemData[index].title ? 50 : 100);
  const dateItemData = useMemo(() => listData(photoCollections(photosByDates)),
    [photosByDates]);
  const getDateItemSize = (index: number) => (dateItemData[index].title ? 50 : 100);

  const dateListRef = useRef() as RefObject<List>;
  const [summaryWidth, setSummaryWidth] = useState(300);
  const [dateWidth, setDateWidth] = useState(0);
  const handleOnSelect = (key: string) => {
    setSummaryWidth(0); 
    setDateWidth(300);
    const index = _.findIndex(dateItemData, item => item.key.startsWith(key) );
    dateListRef.current?.scrollToItem(index, "start");
  };

  return (
    state.loading
      ? <LoadingSpinner />
      : <div className="d-flex">
        <List
          height={400}
          width={summaryWidth}
          itemCount={_.size(yearSummaryItemData)}
          itemSize={getItemSize}
          itemData={yearSummaryItemData}
          useIsScrolling
        >
          {(props) => (
            <Row {...props} onSelect={handleOnSelect} />
          )}
        </List>
 
        <List
          ref={dateListRef}
          height={400}
          width={dateWidth}
          itemCount={_.size(dateItemData)}
          itemSize={getDateItemSize}
          itemData={dateItemData}
        >
          {(props) => (
            <Row {...props} />
          )}
        </List>
     </div>
  );
}