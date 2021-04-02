import { useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export const AppNavBar = () => {
  const location = useLocation();

  return (
    <Navbar>
      <Nav variant="pills" className="mr-auto">
        <Nav.Link href="/years" active={location.pathname.startsWith("/years")}>Timeline</Nav.Link>
        <Nav.Link href="/albums" active={location.pathname.startsWith("/albums")}>Albums</Nav.Link>
      </Nav>
    </Navbar>
  );
};
