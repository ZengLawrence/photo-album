/** A collage of photo thumbnails with title */
import { Card } from 'react-bootstrap';
import { PhotoCollection } from '../models/Photo';
import { PhotoThumbnail } from './PhotoThumbnail';

export const ThumbnailCollageCard = (props: { photoCollection: PhotoCollection }) => {
  const { title, photos } = props.photoCollection;

  return (
    <Card>
      <Card.Header><h2>{title}</h2></Card.Header>
      <Card.Body className="d-flex flex-wrap">
        {photos.map(p => (
          <PhotoThumbnail albumName={p.albumName ? p.albumName : title} photoName={p.name} maxSize={100} />
        ))}
      </Card.Body>
    </Card>
  );
}
