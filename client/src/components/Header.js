import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import LoginModal from "./LoginModal";
import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { currentUser } = useUser();
  console.log(currentUser);
  return (
    <Navbar bg="primary" expand="sm" className="px-3">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src="/rentsg.png"
            style={{ objectFit: "contain", width: "100%", height: "30px" }}
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {currentUser ? (
              <Navbar.Text>
                Signed in as: {currentUser.email.split("@")[0]}
              </Navbar.Text>
            ) : (
              <LoginModal />
            )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
