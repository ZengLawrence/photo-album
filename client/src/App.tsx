import React from 'react';
import Container from 'react-bootstrap/Container';
import {AlbumView} from './components/AlbumView';
import {Photo, PhotoCollection} from './models/Photo';

function mockData() {
  
  const photo1 : Photo = {name: "photo 1"};
  const photo2 : Photo = {name: "photo 2"};

  const photoCollections : PhotoCollection[] = [
    {title: "NYC", photos: [photo1, photo2]},
    {title: "Hong Kong", photos: [photo1, photo2]}
  ];
  return photoCollections;
}

function App() {
  const photoCollections = mockData();
  return (
    <Container>
      <AlbumView albums={photoCollections}/>
    </Container>
  );
}

export default App;
