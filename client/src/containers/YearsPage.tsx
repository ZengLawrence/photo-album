import _ from "lodash";
import { useEffect, useReducer } from "react";
import { Spinner } from "react-bootstrap";
import * as YearsAPI from "../api/Years";
import { PhotoCollectionView } from "../components/PhotoCollectionView";
import { PhotoCollection, PhotosByDate } from "../models/Photo";

function year(photosByDate: PhotosByDate) {
  return photosByDate.date.substring(0, 4);
}

function photoCollection(photosByDate: PhotosByDate[], year: string): PhotoCollection {
  return {
    title: year,
    photos: _.flatMap(photosByDate, 'photos'),
  }
}

function yearView(photosByDate: PhotosByDate[]): PhotoCollection[] {
  const groupByYear = _.groupBy(photosByDate, year);
  return _.map(groupByYear, photoCollection);
}

function yearSummary(photosByDate: PhotosByDate[]): PhotoCollection[] {
  return _.map(yearView(photosByDate), sample);
}

function sample(photoCollection: PhotoCollection): PhotoCollection {
  const { title, photos } = photoCollection;
  return {
    title,
    photos: _.sampleSize(_.flatten(photos), 30)
  };
}

function reducer(state: YearsPageState, action: { type: string, photoCollections: PhotoCollection[] }) {
  switch (action.type) {
    case 'loaded':
      return { ...state, loading: false, photoCollections: action.photoCollections };
    default:
      throw new Error();
  }
}

interface YearsPageState {
  photoCollections: PhotoCollection[],
  loading: boolean,
}

export const YearsPage = () => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      photoCollections: [],
      loading: true
    }
  )
  useEffect(() => {
    YearsAPI.fecthAll().then(data => {
      dispatch({ type: "loaded", photoCollections: yearSummary(data) });
    }
    );
  }, []);

  return (
    <div>
      {state.loading && <Spinner animation="border" variant="primary" />}
      <PhotoCollectionView photoCollections={state.photoCollections} />
    </div>
  );
}