import { useParams } from "react-router-dom";
import { NavigablePhotoView } from "../components/NavigablePhotoView";

export const AlbumDetailView = () => {

  let { albumName } = useParams() as {albumName: string};

  return (
    <NavigablePhotoView title={albumName} />
  )
}

