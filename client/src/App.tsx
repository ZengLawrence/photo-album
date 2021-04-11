import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumPage} from './containers/AlbumPage';
import { AlbumDetailPage } from './containers/AlbumDetailPage';
import { YearsPage } from "./containers/YearsPage";
import { DatesPage } from "./containers/DatesPage";
import { AboutPage } from "./containers/AboutPage";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DatesPageRoute = () => {
  const query = useQuery();
  const year = query.get("scrollToYear") || undefined;
  return <DatesPage scrollToYear={year} />;
}

const AlbumDetailPageRoute = () => {
  const { albumName } = useParams() as { albumName: string };
  const query = useQuery();
  const focusOnPhotoName = query.get("focusOn") || undefined;
  return <AlbumDetailPage albumName={albumName} focusOnPhotoName={focusOnPhotoName} />;
}

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
            <Route path="/dates">
              <DatesPageRoute />
            </Route>
            <Route exact path="/albums">
              <AlbumPage />
            </Route>
            <Route path="/albums/:albumName" children={<AlbumDetailPageRoute />} />
            <Route exact path="/about">
              <AboutPage />
            </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
