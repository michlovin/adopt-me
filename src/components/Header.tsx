import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/css/header.css";
import logo from "./assets/logo.jpg";

export function Header() {
  return (
    <div className="Header">
      <Navbar bg="white" expand="lg" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="{`/./assets/logo.jpg`}"
              alt=""
              width="80"
              height={80}
            ></img>
            <h1 className="text-left text-black">Adopt Me</h1>
          </Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#PetCare">Pet Care</Nav.Link>
            <Nav.Link href="#Adoptions">Adoptions</Nav.Link>
            <Nav.Link href="/intake">Community Resources</Nav.Link>
            <Nav.Link href="/donate">Donate</Nav.Link>
            <Nav.Link href="/donate">Events</Nav.Link>
            <Nav.Link href="/donate">Blog</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
