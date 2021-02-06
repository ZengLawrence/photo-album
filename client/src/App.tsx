import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import {AlbumView} from './components/AlbumView';
import axios from 'axios';
import { PhotoCollection } from './models/Photo';

function App() {
  const [photoCollections, setPhotoCollections] = useState([] as PhotoCollection[]);

  useEffect(() => {
    axios.get('/api/albums')
      .then(res => res.data)
      .then(data => data.albums)
      .then(albums => albums.map(
        (albm: { albumName: string, photoNames: string[] }) => {
          return {
            title: albm.albumName,
            photos: albm.photoNames.map(name => { return { name }; })
          }
        }
      ))
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
