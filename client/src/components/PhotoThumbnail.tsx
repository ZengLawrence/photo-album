import { HTMLProps } from 'react';
import Image from 'react-bootstrap/Image';
import urljoin from 'url-join';
import { Photo } from "../models/Photo";

const DEFAULT_SIZE = 100;

interface PhotoThumbnailProps {
  albumName: string, 
  photoName: string, 
  maxSize: number,
  visible?: boolean
}

export const PhotoThumbnail = (props: PhotoThumbnailProps & HTMLProps<HTMLDivElement>) => {
  const {albumName, photoName, visible, className} = props;
  const maxSize = (props.maxSize ? props.maxSize : DEFAULT_SIZE);
  const src = (visible === undefined || visible) ? thumbnailLink(albumName, photoName, maxSize) : "";
  return (
    <Image src={src} alt={photoName} width={maxSize} height={maxSize} className={className} onClick={props.onClick} />
  );
}

function thumbnailLink(albumName: string, photoName: string, maxSize: number) {
  return urljoin("/api/media/", albumName, "/", photoName, "?maxSize=" + maxSize, "?square");
}
