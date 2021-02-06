/** Photo thumbnails by album */
import React from 'react';
import { PhotoCollectionRow } from './PhotoCollectionRow';
import { PhotoCollection } from '../models/Photo';

export const AlbumView = (props: { albums: PhotoCollection[] }) => {
  const { albums } = props;
  return (
    <div>
      {
        albums.map(albm => (
          // Without the `key`, React will fire a key warning
          <PhotoCollectionRow key={albm.title} photoCollection={albm} />
        ))
      }
    </div>
  );
}