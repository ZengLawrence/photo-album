import Image from 'react-bootstrap/Image';
import { Photo } from "../../models/Photo";

const DEFAULT_SIZE = 300;

export const PhotoImage = (props: {albumName: string, photo: Photo, maxSize?: number, className?: string}) => {
  const {albumName, photo, className} = props;
  const maxSize = (props.maxSize ? props.maxSize : DEFAULT_SIZE);
  const src = thumbnailLink(albumName, photo.name, maxSize);
  return (
    <Image src={src} alt={photo.name} className={className} />
  );
}

function thumbnailLink(albumName: string, photoName: string, maxSize: number) {
  return "/api/media/" + albumName + "/" + photoName + "?maxSize=" + maxSize;
}
