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
import { PhotosByYear } from "./models/Photo";
import { AppNavBar } from "./components/AppNavBar";

const DatesPageRoute = () => {
  const location = useLocation();
  const photosByYear  = location.state as PhotosByYear;

  return (<DatesPage photosByYear={photosByYear} />)
}

function App() {
  return (
    <Router>
      <Container className="h-100">
        <AppNavBar />

        <Switch>
            <Route exact path="/">
              <Redirect to="/years" />
            </Route>
            <Route exact path="/years">
              <YearsPage />
            </Route>
            <Route path="/years/:year">
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
