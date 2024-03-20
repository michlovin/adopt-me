import { Navbar, Container, Nav } from "react-bootstrap";
import "../components/css/header.css";

export function Header() {
  return (
    <div className="Header">
      <Navbar bg="white" expand="lg" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="img/logo.jpg" alt="" width="80" height={80}></img>
            <h1 className="text-left text-black">Adopt Me</h1>
          </Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Pet Care</Nav.Link>
            <Nav.Link href="#pricing">Adoptions</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
