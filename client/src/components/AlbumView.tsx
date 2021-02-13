/** Photo thumbnails by album */
import React, { useEffect, useState } from 'react';
import { PhotoCollectionRow } from './PhotoCollectionRow';
import { PhotoCollection } from '../models/Photo';
import * as Albums from '../api/Albums';

export const AlbumView = () => {

  const [albums, setAlbums] = useState([] as PhotoCollection[]);

  useEffect(() => {
    Albums.fecthAll(3)
      .then( (photoCol : PhotoCollection[]) => {
        setAlbums(photoCol);
      });

  }, []);

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