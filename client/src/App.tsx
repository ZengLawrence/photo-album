import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumView} from './components/AlbumView';
import { PhotoImage } from './components/PhotoImage';
import { Photo } from './models/Photo';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
            <Route exact path="/">
              <AlbumView />
            </Route>
            <Route path="/album/:albumName/:photoName">
              <PhotoView />
            </Route>
        </Switch>
      </Container>
    </Router>
  );
}

function PhotoView() {
  const {albumName, photoName} = useParams() as {albumName: string, photoName: string};
  const photo : Photo = {name: photoName};
  return (<PhotoImage albumName={albumName} photo={photo} />);
}

export default App;
