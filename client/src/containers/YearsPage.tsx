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

function reducer(state: YearsPageState, action: { type: string, photosByDates?: PhotosByDate[] }) {
  switch (action.type) {
    case 'loaded':
      const photosByDates = action.photosByDates ? action.photosByDates : state.photosByDates;
      return { ...state, loading: false, photosByDates };
    case 'date_view':
      return {...state, summaryView: false};
    default:
      throw new Error();
  }
}

const LoadingSpinner = () => <Spinner animation="border" variant="primary" />;

const PhotoList = (props: { photoCollections: KeyedPhotoCollection[], onSelect?: (key: string) => void }) => (
  <div style={{ height: "90%" }}>
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedPhotoCollectionList
          data={props.photoCollections}
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
      dispatch({ type: "loaded", photosByDates: data })
    );
  }, []);
  const handleOnSelect = (key: string) => dispatch({ type: "date_view", });

  const { photosByDates, summaryView } = state;
  const _photoCollections = useMemo(() => {
    return summaryView ? yearSummary(photosByDates) : photoCollections(photosByDates);
  }, [photosByDates, summaryView]);

  return (state.loading ? <LoadingSpinner />
    : <PhotoList
      photoCollections={_photoCollections}
      onSelect={summaryView ? handleOnSelect : undefined}
    />);
}