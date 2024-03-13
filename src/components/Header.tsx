import { Navbar, Container, Nav } from "react-bootstrap";
import "../components/css/header.css";

export function Header() {
  return (
    <div className="Header">
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="img/dog1.jpeg" width="80" height={80}></img>
          </Navbar.Brand>
          <Nav className="mx-auto">
            <h1 className="text-center text-black">Find them homes</h1>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
