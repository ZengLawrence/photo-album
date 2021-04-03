/** Photo thumbnails by album */
import { Fragment, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import * as Albums from '../api/Albums';
import { AppNavBar } from '../components/AppNavBar';
import { CompactPhotoCollectionRow } from '../components/CompactPhotoCollectionRow';
import { PhotoCollection } from '../models/Photo';

const PAGE_SIZE = 10;
const FIRST_PAGE = "1";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AlbumPage = () => {

  const [albums, setAlbums] = useState([] as PhotoCollection[]);

  const query = useQuery();
  const pageNumber = parseInt(query.get("page") || FIRST_PAGE);

  const fetchAlbums = (pageNumb: number) => {

    const skip = (pageNumb > 0 ? pageNumb - 1 : 0);
    Albums.fecthAll({ pageSize: PAGE_SIZE, skip })
      .then((photoCol: PhotoCollection[]) => {
        setAlbums(photoCol);
      });
  }


  useEffect(() => {
    fetchAlbums(pageNumber);
  }, [pageNumber]);

  return (
    <Fragment>
      <AlbumViewNav currentPage={pageNumber} />
      <AblumViewBody albums={albums} />
    </Fragment>
  );
}

const AlbumViewNav = (props: { currentPage: number }) => {
  const { currentPage } = props;

  return (
    <Fragment>
      <AppNavBar />
      <Pagination>
        <Pagination.Prev href={"/albums?page=" + (currentPage - 1)} disabled={(currentPage < 2)} />
        <Pagination.Next href={"/albums?page=" + (currentPage + 1)} />
      </Pagination>
    </Fragment>
  );
}

const AblumViewBody = (props: { albums: PhotoCollection[] }) => {
  const { albums } = props;
  return (
    <div>
      {
        albums.map(albm => (
          // Without the `key`, React will fire a key warning
          <CompactPhotoCollectionRow key={albm.title} photoCollection={albm} overflow />
        ))
      }
    </div>
  );
}