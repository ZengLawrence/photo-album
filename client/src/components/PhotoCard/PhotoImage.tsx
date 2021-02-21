import Image from 'react-bootstrap/Image';
import { Photo } from "../../models/Photo";

const SIZE = 300;

export const PhotoImage = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;
  const src = thumbnailLink(albumName, photo.name);
  return (
    <Image src={src} alt={photo.name} />
  );
}

function thumbnailLink(albumName: string, photoName: string) {
  return "/api/media/" + albumName + "/" + photoName + "?maxSize=" + SIZE;
}
