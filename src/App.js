import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "./firebase";
   
function App(props) {
  // Initialize state
  const [isAuth, setIsAuth] = useState(Boolean(Auth.currentUser));

  // Refresh state
  Auth.onAuthStateChanged(() => setIsAuth(Auth.currentUser));
  
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><strong>Metchup</strong></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuth
              ? <>
                  <LinkContainer to="/login">
                    <NavItem onClick={() => Auth.signOut()}>Logout</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/notes/search">
                    <NavItem>Class Search</NavItem>
                  </LinkContainer>
                </>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes/>
    </div>
  );
}

export default withRouter(App);