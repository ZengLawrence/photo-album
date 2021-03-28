/** A collage of photo thumbnails with title */
import { Card } from 'react-bootstrap';
import { Photo, PhotoCollection } from '../models/Photo';
import { PhotoThumbnail } from './PhotoThumbnail';

function keyValue(photo: Photo) {
  return photo.albumName + "/" + photo.name;
}

export const ThumbnailCollageCard = (props: { photoCollection: PhotoCollection }) => {
  const { title, photos } = props.photoCollection;

  return (
    <Card>
      <Card.Header><h2>{title}</h2></Card.Header>
      <Card.Body className="d-flex flex-wrap">
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <PhotoThumbnail key={keyValue(p)} albumName={p.albumName ? p.albumName : title} photoName={p.name} maxSize={100} />
        ))}
      </Card.Body>
    </Card>
  );
}
