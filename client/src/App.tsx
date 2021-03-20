import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumView} from './containers/AlbumView';
import { AlbumDetailView } from './containers/AlbumDetailView';
import { TimelineView } from "./containers/TimelineView";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
            <Route exact path="/">
              <Redirect to="/albums" />
            </Route>
            <Route exact path="/timeline">
              <TimelineView />
            </Route>
            <Route exact path="/albums">
              <AlbumView />
            </Route>
            <Route path="/albums/:albumName" children={<AlbumDetailView />} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
