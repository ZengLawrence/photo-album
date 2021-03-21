import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumView} from './containers/AlbumView';
import { AlbumDetailView } from './containers/AlbumDetailView';
import { YearsView } from "./containers/YearsView";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
            <Route exact path="/">
              <Redirect to="/years" />
            </Route>
            <Route exact path="/years">
              <YearsView />
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
