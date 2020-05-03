import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "./firebase";
   
function App(props) {
  const refresher = useState();
  
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
            {Auth.currentUser
              ? <>
                  <LinkContainer to="/">
                    <NavItem onClick={Auth.signOut}>Logout</NavItem>
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
  // logout有问题，他现在长期是一个被按过的样子（颜色暗），而且要按两下才能退出，原因不明。
}

export default withRouter(App);