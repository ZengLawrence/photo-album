import _ from "lodash";
import { Fragment, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import * as albumsApi from '../api/Albums';
import { AppNavBar } from "../components/AppNavBar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NavigablePhotoView } from "../components/NavigablePhotoView";
import { Photo } from "../models";

interface Action {
  type: "loaded" | "update",
}

interface LoadAction extends Action {
  type: "loaded",
  photos: Photo[],
}

interface UpdateAction extends Action {
  type: "update",
  photo: Photo,
}

function updatePhoto(action: UpdateAction, state: AlbumDetailPageState) {
  const { photo } = action;
  const { photos } = state;
  const removedIndex = _.findIndex(photos, p => p.name === photo.name);
  return {
    ...state,
    photos: [...photos.slice(0, removedIndex), photo, ...photos.slice(removedIndex + 1)]
  };
}

function reducer(state: AlbumDetailPageState, action: Action) {
  switch (action.type) {
    case 'loaded':
      const { photos } = action as LoadAction;
      return { ...state, loading: false, photos };
    case 'update':
      return updatePhoto(action as UpdateAction, state);
    default:
      throw new Error();
  }
}

interface AlbumDetailPageState {
  photos: Photo[],
  loading: boolean,
}

interface Props {
  albumName: string;
  focusOnPhotoName?: string
}

export const AlbumDetailPage = (props: Props) => {

  const { albumName, focusOnPhotoName } = props;

  const [state, dispatch] = useReducer(
    reducer,
    {
      photos: [],
      loading: true,
    }
  );

  useEffect(() => {
    albumsApi.fetch(albumName)
      .then(photos => dispatch({ type: "loaded", photos } as LoadAction));
  }, [albumName]);

  // need to maintain states here
  // FIXME is it needed?
  const onPhotoUpdated = (photo: Photo) => dispatch({type: "update", photo} as UpdateAction);

  const { loading, photos } = state;
  const history = useHistory();

  return (
    <Fragment>
      <AppNavBar lowerLevelNav onBack={() => { history.push("/albums") }} />
      {loading
        ? <LoadingSpinner />
        :
        <NavigablePhotoView
          title={albumName}
          photos={photos}
          focusOnPhotoName={focusOnPhotoName}
          onPhotoUpdated={onPhotoUpdated}
        />
      }

    </Fragment>
  )
}

