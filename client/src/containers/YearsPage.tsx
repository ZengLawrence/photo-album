import { Fragment, useEffect, useReducer } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import * as YearsAPI from "../api/Years";
import { AppNavBar } from "../components/AppNavBar";
import { TimelineSummaryPhotoList } from "../components/PhotoCollectionList/TimelineSummaryPhotoList";
import { PhotosByDate } from "../models";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useHistory } from "react-router-dom";

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


  const { photosByDates, loading } = state;
  const history = useHistory();

  return (
    loading
      ? <LoadingSpinner />
      :
      <Fragment>
        <AppNavBar/>
        <div style={{ height: "90%" }}>
          <AutoSizer>
            {(props) => (
              <TimelineSummaryPhotoList
                {...props}
                photosByDates={photosByDates}
                onSelectYear={year => history.push("/dates/?scrollToYear=" + year)}
              />
            )}
          </AutoSizer>
        </div>
      </Fragment>
  );
}