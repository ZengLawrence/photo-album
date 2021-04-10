import { useHistory, useLocation } from "react-router-dom";
import { Button, Image, Nav, Navbar } from "react-bootstrap";

function useNavigateTo() {
  const history = useHistory();
  return function (path: string) {
    history.push(path);
  }
}

export const AppNavBar = (props: { lowerLevelNav?: boolean, onBack?: () => void }) => {
  const { lowerLevelNav, onBack } = props;
  const location = useLocation();
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
        <Nav className="mr-auto">
          <Nav.Link onClick={() => navigateTo("/years")} active={location.pathname.startsWith("/years")}>Timeline</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/albums")} active={location.pathname.startsWith("/albums")}>Albums</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
