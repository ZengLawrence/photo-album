/** Photo thumbnails by album */
import { useEffect, useState } from 'react';
import { PhotoCollection } from '../models/Photo';
import * as Albums from '../api/Albums';
import { Pagination } from 'react-bootstrap';
import { CompactPhotoCollectionRow } from '../components/CompactPhotoCollectionRow';

const PAGE_SIZE = 10;
const FIRST_PAGE = 1;

export const AlbumView = () => {

  const [albums, setAlbums] = useState([] as PhotoCollection[]);

  const fetchAlbums = (pageNumb: number) => {
    const skip = (pageNumb > 0 ? pageNumb - 1 : 0);
    Albums.fecthAll({pageSize: PAGE_SIZE, skip})
      .then( (photoCol : PhotoCollection[]) => {
        setAlbums(photoCol);
      });
  }

  useEffect(() => {
    fetchAlbums(FIRST_PAGE);
  }, []);

  return (
    <div>
      <AlbumViewNav onPage={fetchAlbums} />
      <AblumViewBody albums={albums}/>
    </div>
  );
}

const AlbumViewNav = (props: { onPage: (pageNumber: number) => void }) => {
  const { onPage } = props;
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  const goToPage = (pageNumb: number) => {
    setCurrentPage(pageNumb);
    onPage(pageNumb);
  }

  const nextPage = () => {
    goToPage(currentPage + 1);
  }

  const prevPage = () => {
    goToPage(currentPage - 1);
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
          <CompactPhotoCollectionRow key={albm.title} photoCollection={albm} />
        ))
      }
    </div>
  );
}