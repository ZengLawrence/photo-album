/** A row of photo thumbnails with title */
import React from 'react';
import Row from 'react-bootstrap/Row';
import {PhotoCollection} from '../models/Photo';
import { PhotoImage } from './PhotoImage';

export const PhotoCollectionRow = (props: {photoCollection: PhotoCollection}) => {
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <Row>
        <h1>{title}</h1>
      </Row>
      <Row>
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <PhotoImage key={p.name} albumName={title} photo={p} />
        ))}
      </Row>      
    </div>
  );
}

