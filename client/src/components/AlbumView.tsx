/** Photo thumbnails by album */
import React, { useEffect, useState } from 'react';
import { PhotoCollectionRow } from './PhotoCollectionRow';
import { PhotoCollection } from '../models/Photo';
import * as Albums from '../api/Albums';

const PAGE_SIZE = 3;

export const AlbumView = () => {

  const [albums, setAlbums] = useState([] as PhotoCollection[]);

  useEffect(() => {
    Albums.fecthAll(PAGE_SIZE)
      .then( (photoCol : PhotoCollection[]) => {
        setAlbums(photoCol);
      });

  }, []);

  return (
    <AblumViewBody albums={albums}/>
  );
}

const AblumViewBody = (props: {albums: PhotoCollection[]})=> {
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