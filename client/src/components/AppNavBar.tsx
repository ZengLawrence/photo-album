import { useLocation } from "react-router-dom";
import { Button, Image, Nav, Navbar } from "react-bootstrap";

export const AppNavBar = (props: { secondaryLevelNav?: boolean, onBack?: () => void }) => {
  const { secondaryLevelNav, onBack } = props;
  const location = useLocation();

  const expandBreakPoint = secondaryLevelNav ? "xl" : "sm";

  return (
    <Navbar collapseOnSelect expand={expandBreakPoint}>
      <Navbar.Brand>
        <Image
          src="/photo-gallery-96.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Photo Album logo"
        />{secondaryLevelNav ? "" : " Photo Album"}
      </Navbar.Brand>

      {secondaryLevelNav &&
        <Nav className="mr-auto">
          <Button variant="outline-secondary" onClick={onBack}>Back</Button>
        </Nav>
      }
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/years" active={location.pathname.startsWith("/years")}>Timeline</Nav.Link>
          <Nav.Link href="/albums" active={location.pathname.startsWith("/albums")}>Albums</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
