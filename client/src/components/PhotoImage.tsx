import Image from 'react-bootstrap/Image';
import { Photo } from "../models/Photo";

const SIZE = 300;

export const PhotoImage = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;
  const src = thumbnailLink(albumName, photo.name);
  const href = "/album/" + albumName + "/" + photo.name;
  return (
    <a href={href}>
      <Image src={src} height={SIZE} width={SIZE} alt={photo.name} className="PA-Thumbnail"/>
    </a>
  );
}

function thumbnailLink(albumName: string, photoName: string) {
  return "/api/media/" + albumName + "/" + photoName + "?maxSize=" + SIZE;
}
