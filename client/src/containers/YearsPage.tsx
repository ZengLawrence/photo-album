import { Fragment, useEffect, useReducer } from "react";
import { Spinner } from "react-bootstrap";
import * as YearsAPI from "../api/Years";
import { AppNavBar } from "../components/AppNavBar";
import { TimelinePhotoList } from "../components/PhotoCollectionList/TimelinePhotoList";
import { PhotosByDate } from "../models";

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
      <Fragment>
        <AppNavBar lowerLevelNav={!summaryView} onBack={() => dispatch({ type: 'summary_view' })} />
        <div style={{ height: "90%" }}>
          <TimelinePhotoList
            summaryView={summaryView}
            photosByDates={photosByDates}
            onSelectYear={() => dispatch({ type: "date_view" })}
          />
        </div>
      </Fragment>
  );
}