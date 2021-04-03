import { useLocation } from "react-router-dom";
import { Image, Nav, Navbar } from "react-bootstrap";

export const AppNavBar = () => {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="sm">
      <Navbar.Brand>
        <Image
          src="/photo-gallery-96.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Photo Album logo"
        />{' '}
        Photo Album
      </Navbar.Brand>

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
