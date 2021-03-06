import { Fragment, useEffect, useState } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import * as Albums from '../api/Albums';
import { AppNavBar } from '../components/AppNavBar';
import { AlbumPhotoList } from '../components/PhotoCollectionList/AlbumPhotoList';
import { Album } from '../models';

export const AlbumPage = () => {

  const [albums, setAlbums] = useState([] as Album[]);

  useEffect(() => {
    Albums.fecthAll()
      .then(albums => {
        setAlbums(albums);
      });
  }, []);

  return (
    <Fragment>
      <AppNavBar />
      <div style={{ height: "90%" }}>
        <AutoSizer>
          {props => (
            <AlbumPhotoList {...props} albums={albums} />
          )}
        </AutoSizer>
      </div>
    </Fragment>
  );
}
