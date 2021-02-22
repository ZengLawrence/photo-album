/** Photo thumbnails by album */
import React, { useEffect, useState } from 'react';
import { PhotoCollectionRow } from './PhotoCollectionRow';
import { PhotoCollection } from '../models/Photo';
import * as Albums from '../api/Albums';
import { Pagination } from 'react-bootstrap';

const PAGE_SIZE = 3;
const FIRST_PAGE = 1;

export const AlbumView = () => {

  const [albums, setAlbums] = useState([] as PhotoCollection[]);
  const [page, setPage] = useState(FIRST_PAGE);

  const fetchAlbums = (pageNumb: number) => {
    const skip = (pageNumb > 0 ? pageNumb - 1 : 0);
    Albums.fecthAll({pageSize: PAGE_SIZE, skip})
      .then( (photoCol : PhotoCollection[]) => {
        setAlbums(photoCol);
      });
      setPage(pageNumb);
  }

  useEffect(() => {
    fetchAlbums(FIRST_PAGE);
  }, []);

  return (
    <div>
      <AlbumViewNav currentPage={page} onPage={fetchAlbums} />
      <AblumViewBody albums={albums}/>
    </div>
  );
}

const AlbumViewNav = (props: { currentPage: number, onPage: (pageNumber: number) => void }) => {
  const { currentPage, onPage } = props;

  const nextPage = () => {
    onPage(currentPage + 1);
  }

  const prevPage = () => {
    onPage(currentPage - 1);
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={prevPage} disabled={(currentPage < 2)} />
      <Pagination.Next onClick={nextPage} />
    </Pagination>
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