import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NavigablePhotoView } from "../components/NavigablePhotoView";
import { Photo } from "../models/Photo";
import * as albumsApi from '../api/Albums';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AlbumDetailView = () => {

  const query = useQuery();
  const photoName = query.get("focusOn") || undefined;
  const { albumName } = useParams() as {albumName: string};
  const [photos, setPhotos] = useState([] as Photo[]);

  useEffect(() =>{
    albumsApi.fetch(albumName)
      .then(data => setPhotos(data))
  }, [albumName]);

  return (
    <NavigablePhotoView title={albumName} photos={photos} focusOnPhotoName={photoName} />
  )
}

