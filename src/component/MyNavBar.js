import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function MyNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Qurey
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Nav.Link as={NavLink} to="/ruhi">
              Ruhi
            </Nav.Link>
            <Nav.Link as={NavLink} to="/kawsar">
              Kawsar
            </Nav.Link>
            <Nav.Link as={NavLink} to="/mobin">
              Mobin
            </Nav.Link>
            <Nav.Link as={NavLink} to="/giash">
              Giash
            </Nav.Link>
            <Nav.Link as={NavLink} to="/rabbi">
              Rabbi
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
