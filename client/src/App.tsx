import React from 'react';
import Container from 'react-bootstrap/Container';
import {TimelineView} from './components/TimelineView';
import {Photo, PhotoCollection} from './models/Photo';

function mockData() {
  
  const photo1 : Photo = {name: "photo 1"};
  const photo2 : Photo = {name: "photo 2"};

  const photoCollections : PhotoCollection[] = [
    {title: "2020", photos: [photo1, photo2]},
    {title: "2021", photos: [photo1, photo2]}
  ];
  return photoCollections;
}

function App() {
  const photoCollections = mockData();
  return (
    <Container>
      <TimelineView photosByYears={photoCollections}/>
    </Container>
  );
}

export default App;
