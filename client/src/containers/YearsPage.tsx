import _ from "lodash";
import { useEffect, useMemo, useReducer } from "react";
import { Spinner } from "react-bootstrap";
import AutoSizer from "react-virtualized-auto-sizer";
import * as YearsAPI from "../api/Years";
import { KeyedPhotoCollection, VirtualizedPhotoCollectionList } from "../components/VirtualizedPhotoCollectionList";
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

interface PhotoListProps {
  data: KeyedPhotoCollection[],
  onSelect?: (key: string) => void,
}

const PhotoList = (props: PhotoListProps) => (
  <div style={{ height: "90%" }}>
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedPhotoCollectionList
          {...props}
          width={width}
          height={height}
          onSelect={props.onSelect}
        />
      )}
    </AutoSizer>
  </div>
);

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
  const handleOnSelect = (key: string) => dispatch({ type: "date_view", year: key } as DateViewAction);

  const { photosByDates, summaryView } = state;
  const _photoCollections = useMemo(() => {
    return summaryView ? yearSummary(photosByDates) : photoCollections(photosByDates);
  }, [photosByDates, summaryView]);

  return (state.loading ? <LoadingSpinner />
    : <PhotoList
      data={_photoCollections}
      onSelect={summaryView ? handleOnSelect : undefined}
    />);
}