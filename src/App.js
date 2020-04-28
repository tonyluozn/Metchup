import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
   
function App(props) {

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // below: right now set it to true 
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    //change from false to true
    setIsAuthenticating(false);
  }
  
  return (
    !isAuthenticating &&
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
            {isAuthenticated
              ? <>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
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
                  <NavItem onClick={handleGetin}>Fast Getin</NavItem>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );

  async function handleLogout() {
    await Auth.signOut();
  //set this to true 
    userHasAuthenticated(false);
    
    props.history.push("/login");
  }
  async function handleGetin() {
  //set this to true 
    userHasAuthenticated(true);
    props.history.push("/");
  }
}

export default withRouter(App);