import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavigablePhotoView } from "../components/NavigablePhotoView";
import { Photo } from "../models/Photo";
import * as Albums from '../api/Albums';

export const AlbumDetailView = () => {

  const { albumName } = useParams() as {albumName: string};
  const [photos, setPhotos] = useState([] as Photo[]);

  useEffect(() =>{
    Albums.fetch(albumName)
      .then(data => setPhotos(data))
  }, [albumName]);

  return (
    <NavigablePhotoView title={albumName} photos={photos} />
  )
}

