import { Carousel } from 'react-bootstrap';
import { Photo, PhotoCollection } from '../models/Photo';
import { PhotoImage } from './PhotoCard/PhotoImage';

export const PhotoCollectionCarousel = (props: {photoCollection: PhotoCollection}) => {
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <h1>{title}</h1>
      <PhotoCarousel albumName={title} photos={photos} />
    </div>      
  );
}

const PhotoCarousel = (props: {albumName: string, photos: Photo[]}) => {
  const {albumName, photos} = props;
  return (
    <Carousel>
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <Carousel.Item  key={p.name}>
            <PhotoImage albumName={albumName} photo={p} />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}