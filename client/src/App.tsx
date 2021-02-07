import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import {AlbumView} from './components/AlbumView';
import { PhotoCollection } from './models/Photo';
import * as Albums from './api/Albums';

function App() {
  const [photoCollections, setPhotoCollections] = useState([] as PhotoCollection[]);

  useEffect(() => {
    Albums.fecthAll()
      .then( (photoCol : PhotoCollection[]) => {
        console.debug(photoCol);
        setPhotoCollections(photoCol);
      });

  }, []);

  return (
    <Container>
      <AlbumView albums={photoCollections}/>
    </Container>
  );
}

export default App;
