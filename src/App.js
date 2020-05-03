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
                  <LinkContainer to="/login">
                    <NavItem onClick={() => Auth.signOut()} >Logout</NavItem>
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
  //上面那个routes好像是显示container用的？删掉之后没有下面的界面了。挺有意思的。
}

export default withRouter(App);