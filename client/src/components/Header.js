import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import LoginModal from "./LoginModal";
import { useUser } from "../contexts/UserContext";
import { BiUserCircle } from "react-icons/bi";
import axios from "../axios";

export default function Header() {
  const { currentUser, setCurrentUser } = useUser();

  const logout = async () => {
    try {
      await axios.get("/api/logout", { withCredentials: true });
      setCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };

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
            <NavDropdown
              flip="true"
              align="end"
              title={<BiUserCircle size={"1.5em"} />}
              id="basic-nav-dropdown"
            >
              {currentUser ? (
                <NavDropdown.Item href="#action/3.1">
                  Signed in as: {currentUser.email.split("@")[0]}
                </NavDropdown.Item>
              ) : (
                <LoginModal />
              )}
              {currentUser && (
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              )}
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
