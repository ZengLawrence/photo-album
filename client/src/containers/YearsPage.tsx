import _ from "lodash";
import { useEffect, useReducer } from "react";
import { Spinner } from "react-bootstrap";
import ReactVisibilitySensor from "react-visibility-sensor";
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

function viewablePhotoCollections(state: YearsPageState) {
  return _.slice(state.photoCollections, 0, state.viewableCount);
}

function reducer(state: YearsPageState, action: { type: string, photoCollections?: PhotoCollection[] }) {
  switch (action.type) {
    case 'loaded':
      const photoCollections = action.photoCollections ? action.photoCollections : state.photoCollections;
      return { ...state, loading: false, photoCollections };
    case 'show_more':
      return { ...state, viewableCount: state.viewableCount + 1 };
    default:
      throw new Error();
  }
}

interface YearsPageState {
  photoCollections: PhotoCollection[],
  loading: boolean,
  viewableCount: number,
}

export const YearsPage = () => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      photoCollections: [],
      loading: true,
      viewableCount: 5,
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
      <PhotoCollectionView photoCollections={viewablePhotoCollections(state)} />
      {
        state.viewableCount < _.size(state.photoCollections) &&
        <ReactVisibilitySensor onChange={(isVisible) => { isVisible && dispatch({ type: "show_more" }) }} >
          <Spinner animation="border" variant="primary" />
        </ReactVisibilitySensor>
      }
    </div>
  );
}