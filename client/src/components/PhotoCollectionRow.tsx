/** A row of photo thumbnails with title */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import {Photo, PhotoCollection} from '../models/Photo';

const SIZE = 300;

function thumbnailLink(albumName: string, photoName: string) {
  return "/api/media/" + albumName + "/" + photoName + "?maxSize=" + SIZE;
}

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

const PhotoImage = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;
  const src = thumbnailLink(albumName, photo.name);
  const href = "/album/" + albumName + "/" + photo.name;
  return (
    <a href={href}>
      <Image src={src} height={SIZE} width={SIZE} alt={photo.name} className="PA-Thumbnail"/>
    </a>
  );
}
