import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumPage} from './containers/AlbumPage';
import { AlbumDetailPage } from './containers/AlbumDetailPage';
import { YearsPage } from "./containers/YearsPage";

function App() {
  return (
    <Router>
      <Container className="h-100">

        <Switch>
            <Route exact path="/">
              <Redirect to="/years" />
            </Route>
            <Route exact path="/years">
              <YearsPage />
            </Route>
            <Route exact path="/albums">
              <AlbumPage />
            </Route>
            <Route path="/albums/:albumName" children={<AlbumDetailPage />} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
