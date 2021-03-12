import { HTMLProps } from 'react';
import Image from 'react-bootstrap/Image';
import urljoin from 'url-join';
import { Photo } from "../models/Photo";

const DEFAULT_SIZE = 100;

export const PhotoThumbnail = (props: {albumName: string, photo: Photo, maxSize?: number} & HTMLProps<HTMLDivElement>) => {
  const {albumName, photo, className} = props;
  const maxSize = (props.maxSize ? props.maxSize : DEFAULT_SIZE);
  const src = thumbnailLink(albumName, photo.name, maxSize);
  return (
    <Image src={src} alt={photo.name} width={maxSize} height={maxSize} className={className} onClick={props.onClick} />
  );
}

function thumbnailLink(albumName: string, photoName: string, maxSize: number) {
  return urljoin("/api/media/", albumName, "/", photoName, "?maxSize=" + maxSize, "?square");
}
