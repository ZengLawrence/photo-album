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

  const fetchAlbums = (pageNumb: number = 0) => {
    const skip = (pageNumb > 0 ? pageNumb - 1 : 0);
    Albums.fecthAll({pageSize: PAGE_SIZE, skip})
      .then( (photoCol : PhotoCollection[]) => {
        setAlbums(photoCol);
      });
  }

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchAlbums(newPage);
  }

  const prevPage = () => {
    const newPage = (page < 1 ? 0 : page - 1);
    setPage(newPage);
    fetchAlbums(newPage);
  }

  useEffect(() => {
    const firstPage = () => {
      fetchAlbums();
    }
    firstPage();
  }, []);

  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={prevPage} disabled={(page < 2)} />
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