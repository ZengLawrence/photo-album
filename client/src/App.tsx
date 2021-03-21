import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AlbumView} from './containers/AlbumView';
import { AlbumDetailView } from './containers/AlbumDetailView';
import { YearsView } from "./containers/YearsView";
import { Nav, Navbar } from "react-bootstrap";

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

function App() {
  return (
    <Router>
      <Container>
        <AppNavBar />

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
