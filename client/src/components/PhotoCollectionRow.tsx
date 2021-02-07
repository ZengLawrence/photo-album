/** A row of photo thumbnails with title */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import {PhotoCollection} from '../models/Photo';

function thumbnailLink(albumName: string, photoName: string) {
  return "/api/media/" + albumName + "/" + photoName + "?width=300&height=300";
}

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
            <Image key={p.name} src={thumbnailLink(title, p.name)} height="300" width="300" alt={p.name} thumbnail/>
          ))}
        </p>
      </Row>      
    </div>
  );
}
