import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "./firebase";
   
function App(props) {

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // below: right now set it to true 
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    //（常规）查看是否auth了
    try {
      userHasAuthenticated(Auth.isAuthenticated);
    }
    catch(e) {
      alert(e);
    }
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
            {Auth.currentUser
              ? <>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                  <LinkContainer to="/notes/new">
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
  //上面那个appProps是干啥的？需要吗？

  async function handleLogout() {
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