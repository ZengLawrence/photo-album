import Image, { ImageProps } from 'react-bootstrap/Image';
import urljoin from 'url-join';

const DEFAULT_SIZE = 100;

interface PhotoThumbnailProps {
  albumName: string, 
  photoName: string, 
  maxSize: number,
  visible?: boolean // by default, it is true
}

export const PhotoThumbnail = (props: PhotoThumbnailProps & ImageProps) => {
  const {albumName, photoName, visible} = props;
  const maxSize = (props.maxSize ? props.maxSize : DEFAULT_SIZE);
  const src = (visible === undefined || visible) ? thumbnailLink(albumName, photoName, maxSize) : "";
  return (
    <Image {...props} src={src} alt={photoName} width={maxSize} height={maxSize} onClick={props.onClick} />
  );
}

function thumbnailLink(albumName: string, photoName: string, maxSize: number) {
  return urljoin("/api/media/", albumName, "/", photoName, "?maxSize=" + maxSize, "?square");
}
