import _ from "lodash";
import { useEffect, useMemo, useReducer } from "react";
import { Spinner } from "react-bootstrap";
import ReactVisibilitySensor from "react-visibility-sensor";
import * as YearsAPI from "../api/Years";
import { PhotoCollectionView } from "../components/PhotoCollectionView";
import { PhotoCollection, PhotosByDate } from "../models/Photo";

function yearView(photosByDate: PhotosByDate[]) {
  const year = (photosByDate: PhotosByDate) => {
    return photosByDate.date.substring(0, 4);
  };
  const photoCollection = (photosByDate: PhotosByDate[], year: string): PhotoCollection => {
    return {
      title: year,
      photos: _.flatMap(photosByDate, 'photos'),
    }
  };

  return _.map(_.groupBy(photosByDate, year), photoCollection);
}

function yearSummary(photosByDate: PhotosByDate[]) {
  const sample = (photoCollection: PhotoCollection): PhotoCollection => {
    const { title, photos } = photoCollection;
    return {
      title,
      photos: _.sampleSize(_.flatten(photos), 30)
    };
  };

  return _.map(yearView(photosByDate), sample);
}

function photoCollections(photosByDates: PhotosByDate[]) {
  const photoCollection = (pbd: PhotosByDate): PhotoCollection => {
    return {
      title: pbd.date,
      photos: pbd.photos,
    }
  }
  return _.map(photosByDates, photoCollection);
}

function viewablePhotoCollections(photoCollections: PhotoCollection[], viewableCount: number) {
  return _.slice(photoCollections, 0, viewableCount);
}

function reducer(state: YearsPageState, action: { type: string, photosByDates?: PhotosByDate[] }) {
  switch (action.type) {
    case 'loaded':
      const photosByDates = action.photosByDates ? action.photosByDates : state.photosByDates;
      return { ...state, loading: false, photosByDates };
    case 'show_more':
      return { ...state, viewableCount: state.viewableCount + 1 };
    default:
      throw new Error();
  }
}

interface YearsPageState {
  photosByDates: PhotosByDate[],
  loading: boolean,
  viewableCount: number,
  summaryView: boolean,
}

export const YearsPage = (props: { summaryView?: boolean }) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      photosByDates: [],
      loading: true,
      viewableCount: 5,
      summaryView: props.summaryView || false,
    }
  )
  useEffect(() => {
    YearsAPI.fecthAll().then(data => {
      dispatch({ type: "loaded", photosByDates: data });
    }
    );
  }, []);

  const { photosByDates, summaryView } = state;
  const _photoCollections = useMemo(() => {
    return summaryView ? yearSummary(photosByDates) : photoCollections(photosByDates);
  }, [photosByDates, summaryView]);

  return (
    <div>
      {state.loading && <Spinner animation="border" variant="primary" />}
      <PhotoCollectionView photoCollections={viewablePhotoCollections(_photoCollections, state.viewableCount)} />
      {
        state.viewableCount < _.size(_photoCollections) &&
        <ReactVisibilitySensor onChange={(isVisible) => { isVisible && dispatch({ type: "show_more" }) }} >
          <Spinner animation="border" variant="primary" />
        </ReactVisibilitySensor>
      }
    </div>
  );
}