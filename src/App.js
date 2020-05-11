import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "./firebase";
   
function App(props) {
  const [isAuth, setIsAuth] = useState(Boolean(Auth.currentUser));
  Auth.onAuthStateChanged(() => setIsAuth(Boolean(Auth.currentUser)));
  
  return (
    <div className="App container">
      <Navbar sticky="top" fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><strong>Metchup</strong></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuth
              ? loggedIn()
              : notLoggedIn()
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes/>
    </div>
  );

  function loggedIn() {
    return (
      <>
        <LinkContainer to="/">
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to="/notes/search">
          <NavItem>Class Search</NavItem>
        </LinkContainer>

        <NavDropdown title="Account">
          <LinkContainer to="/login">
            <NavItem onClick={() => Auth.signOut()}>Logout</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem >User center</NavItem>
          </LinkContainer>
        </NavDropdown>
      </>);
  }

  function notLoggedIn() {
    return (
      <>
        <LinkContainer to="/signup">
          <NavItem>Signup</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
      </>
    );
  }
}

export default withRouter(App);