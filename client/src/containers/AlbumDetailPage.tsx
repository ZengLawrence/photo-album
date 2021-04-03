import { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as albumsApi from '../api/Albums';
import { AppNavBar } from "../components/AppNavBar";
import { NavigablePhotoView } from "../components/NavigablePhotoView";
import { Photo } from "../models";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AlbumDetailPage = () => {

  const query = useQuery();
  const photoName = query.get("focusOn") || undefined;
  const { albumName } = useParams() as { albumName: string };
  const [photos, setPhotos] = useState([] as Photo[]);

  useEffect(() => {
    albumsApi.fetch(albumName)
      .then(data => setPhotos(data))
  }, [albumName]);

  // need to maintain states here
  const onPhotoUpdated = (photo: Photo) => {
    const removedIndex = photos.findIndex(p => p.name === photo.name);
    setPhotos([...photos.slice(0, removedIndex), photo, ...photos.slice(removedIndex + 1)])
  }

  const history = useHistory();

  return (
    <Fragment>
      <AppNavBar lowerLevelNav onBack={()=>{history.push("/albums")}}/>
      <NavigablePhotoView 
        title={albumName} 
        photos={photos} 
        focusOnPhotoName={photoName} 
        onPhotoUpdated={onPhotoUpdated} 
        />
    </Fragment>
  )
}

