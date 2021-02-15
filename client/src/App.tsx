import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumView} from './components/AlbumView';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
            <Route exact path="/">
              <AlbumView />
            </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
