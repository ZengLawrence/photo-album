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
import { Nav, Navbar } from "react-bootstrap";
import { DatesPage } from "./containers/DatesPage";
import { PhotosByYear } from "./models/Photo";

const AppNavBar = () => {
  const location = useLocation();

  return (
    <Navbar>
      <Nav variant="pills" className="mr-auto">
        <Nav.Link href="/years" active={location.pathname.startsWith("/years")} >Timeline</Nav.Link>
        <Nav.Link href="/albums" active={location.pathname.startsWith("/albums")} >Albums</Nav.Link>
      </Nav>
    </Navbar>
  );
}

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
