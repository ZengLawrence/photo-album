import _ from "lodash";
import { useEffect, useReducer } from "react";
import { Button, Spinner } from "react-bootstrap";
import * as YearsAPI from "../api/Years";
import { KeyedPhotoCollection } from "../components/PhotoCollectionList/KeyedPhotoCollection";
import { TimelinePhotoList } from "../components/PhotoCollectionList/TimelinePhotoList";
import { PhotoCollection, PhotosByDate } from "../models/Photo";

function yearView(photosByDate: PhotosByDate[]) {
  const year = (photosByDate: PhotosByDate) => photosByDate.date.substring(0, 4);
  const photoCollection = (photosByDate: PhotosByDate[], year: string): PhotoCollection => ({
    title: year,
    photos: _.flatMap(photosByDate, 'photos'),
  });

  return _.map(_.groupBy(photosByDate, year), photoCollection);
}

export function yearSummary(photosByDate: PhotosByDate[]): KeyedPhotoCollection[] {
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

export function photoCollections(photosByDates: PhotosByDate[]): KeyedPhotoCollection[] {
  const photoCollection = (pbd: PhotosByDate) => ({
    title: pbd.date,
    photos: pbd.photos,
    key: pbd.date,
  });
  return _.map(photosByDates, photoCollection);
}

interface Action {
  type: "loaded" | "date_view" | "summary_view",
}

interface LoadAction extends Action {
  type: "loaded",
  photosByDates: PhotosByDate[],
}

function reducer(state: YearsPageState, action: Action) {
  switch (action.type) {
    case 'loaded':
      const { photosByDates } = action as LoadAction;
      return { ...state, loading: false, photosByDates };
    case 'date_view':
      return { ...state, summaryView: false };
    case 'summary_view':
      return { ...state, summaryView: true };
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


  const { summaryView, photosByDates } = state;

  return (
    state.loading
      ? <LoadingSpinner />
      :
      <div className="d-flex" style={{ height: "90%" }}>
        <div>
          {!state.summaryView &&
            <Button variant="primary" onClick={() => dispatch({ type: 'summary_view' })}>Back</Button>}
        </div>
        <TimelinePhotoList
          summaryView={summaryView}
          photosByDates={photosByDates}
          onSelectYear={() => dispatch({ type: "date_view" })}
        />
      </div>
  );
}