/** Photo thumbnails by album */
import React, { useEffect, useState } from 'react';
import { PhotoCollectionRow } from './PhotoCollectionRow';
import { PhotoCollection } from '../models/Photo';
import * as Albums from '../api/Albums';
import { Pagination } from 'react-bootstrap';

const PAGE_SIZE = 3;

export const AlbumView = () => {

  const [albums, setAlbums] = useState([] as PhotoCollection[]);
  const [page, setPage] = useState(1);

  const fetchAlbums = (options: {skip: number}) => {
    const { skip } = options;
    Albums.fecthAll({pageSize: PAGE_SIZE, skip})
      .then( (photoCol : PhotoCollection[]) => {
        setAlbums(photoCol);
      });
  }

  const nextPage = () => {
    setPage(page + 1);
    const skip = page;
    fetchAlbums({skip})
  }

  useEffect(() => {
    fetchAlbums({skip: 0});
  }, []);

  return (
    <div>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Next onClick={nextPage} />
      </Pagination>
      <AblumViewBody albums={albums}/>
    </div>
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