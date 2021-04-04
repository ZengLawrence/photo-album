import { Fragment, useEffect, useReducer } from "react";
import { PhotosByDate } from "../models";
import * as YearsAPI from "../api/Years";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TimelinePhotoList } from "../components/PhotoCollectionList/TimelinePhotoList";
import AutoSizer from "react-virtualized-auto-sizer";
import { AppNavBar } from "../components/AppNavBar";
import { useHistory } from "react-router-dom";

interface Action {
  type: "loaded",
}

interface LoadAction extends Action {
  type: "loaded",
  photosByDates: PhotosByDate[],
}

function reducer(state: DatesPageState, action: Action) {
  switch (action.type) {
    case 'loaded':
      const { photosByDates } = action as LoadAction;
      return { ...state, loading: false, photosByDates };
    default:
      throw new Error();
  }
}

interface DatesPageState {
  photosByDates: PhotosByDate[],
  loading: boolean,
}

export const DatesPage = (props: {scrollToYear?: string}) => {
  const {scrollToYear } = props;

  const [state, dispatch] = useReducer(
    reducer,
    {
      photosByDates: [],
      loading: true,
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
        <AppNavBar lowerLevelNav onBack={()=>history.push("/years")}/>
        <div style={{ height: "90%" }}>
          <AutoSizer>
            {(props) => (
              <TimelinePhotoList
                {...props}
                photosByDates={photosByDates}
                scrollToYear={scrollToYear}
              />
            )}
          </AutoSizer>
        </div>
      </Fragment>
  );
}