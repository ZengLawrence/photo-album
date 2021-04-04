import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumPage} from './containers/AlbumPage';
import { AlbumDetailPage } from './containers/AlbumDetailPage';
import { YearsPage } from "./containers/YearsPage";
import { DatesPage } from "./containers/DatesPage";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DatesPageRoute = () => {
  const query = useQuery();
  const year = query.get("scrollToYear") || undefined;
  return <DatesPage scrollToYear={year} />
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
            <Route path="/albums/:albumName" children={<AlbumDetailPage />} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
