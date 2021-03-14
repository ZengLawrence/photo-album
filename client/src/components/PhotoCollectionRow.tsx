/** A row of photo thumbnails with title */
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import {Photo, PhotoCollection} from '../models/Photo';
import { PhotoCard } from './PhotoCard';

export const PhotoCollectionRow = (props: {photoCollection: PhotoCollection}) => {
  const {title} = props.photoCollection;
  const [photos, setPhotos] = useState(props.photoCollection.photos)

  // need to maintain states here
  const onPhotoUpdated = (photo: Photo) => {
    const removedIndex = photos.findIndex(p => p.name === photo.name);
    setPhotos([...photos.slice(0, removedIndex), photo, ...photos.slice(removedIndex + 1)])
  }

  return (
    <div>
      <Row>
        <h1>{title}</h1>
      </Row>
      <Row>
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <PhotoCard key={p.name} albumName={title} photo={p} onPhotoUpdated={onPhotoUpdated} />
        ))}
      </Row>      
    </div>
  );
}

