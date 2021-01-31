/** A row of photo thumbnails with title */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import {PhotoCollection} from '../models/Photo';

export const PhotoCollectionRow = (props: {photoCollection: PhotoCollection}) => {
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <Row>
        <h1>{title}</h1>
      </Row>
      <Row>
        <p>
          {photos.map(p => (
            // Without the `key`, React will fire a key warning
            <Image key={p.name} height="50" width="50" alt={p.name}/>
          ))}
        </p>
      </Row>      
    </div>
  );
}
