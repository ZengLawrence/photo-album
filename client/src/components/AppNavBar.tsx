import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";

function useNavigateTo() {
  const history = useHistory();
  return function (path: string) {
    history.push(path);
  }
}

function useActiveKey() {
  const matchAlbums = useRouteMatch("/albums");
  const matchAbout = useRouteMatch("/about");
  return function () {
    if (matchAlbums) return "albums";
    if (matchAbout) return "about";
    return "timeline";
  }
}

export const AppNavBar = (props: { lowerLevelNav?: boolean, onBack?: () => void }) => {
  const { lowerLevelNav, onBack } = props;
  const activeKey = useActiveKey();
  const navigateTo = useNavigateTo();

  const expandBreakPoint = lowerLevelNav ? "xl" : "sm";

  return (
    <Navbar collapseOnSelect expand={expandBreakPoint}>
      <Navbar.Brand>
        <Image
          src="/photo-gallery-96.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Photo Album logo"
        />{lowerLevelNav ? "" : " Photo Album"}
      </Navbar.Brand>

      {lowerLevelNav &&
        <Nav className="mr-auto">
          <Button variant="outline-secondary" onClick={onBack}>Back</Button>
        </Nav>
      }
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={activeKey()} defaultActiveKey="timeline" className="mr-auto">
          <Nav.Link onClick={() => navigateTo("/years")} eventKey="timeline">Timeline</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/albums")} eventKey="albums">Albums</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/about")} eventKey="about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
