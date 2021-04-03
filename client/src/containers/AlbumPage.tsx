/** Photo thumbnails by album */
import { Fragment, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import * as Albums from '../api/Albums';
import { AppNavBar } from '../components/AppNavBar';
import { AlbumPhotoList } from '../components/PhotoCollectionList/AlbumPhotoList';
import { Album } from '../models';

const PAGE_SIZE = 10;
const FIRST_PAGE = "1";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AlbumPage = () => {

  const [albums, setAlbums] = useState([] as Album[]);

  const query = useQuery();
  const pageNumber = parseInt(query.get("page") || FIRST_PAGE);

  const fetchAlbums = (pageNumb: number) => {

    const skip = (pageNumb > 0 ? pageNumb - 1 : 0);
    Albums.fecthAll({ pageSize: PAGE_SIZE, skip })
      .then(albums => {
        setAlbums(albums);
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

const AblumViewBody = (props: { albums: Album[] }) => {
  const { albums } = props;
  return (
    <div style={{ height: "90%" }}>
      <AlbumPhotoList albums={albums} />
    </div>
  );
}