import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumView} from './containers/AlbumView';
import { AlbumDetailView } from './containers/AlbumDetailView';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
            <Route exact path="/">
              <AlbumView />
            </Route>
            <Route path="/albums/:albumName" children={<AlbumDetailView />} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
