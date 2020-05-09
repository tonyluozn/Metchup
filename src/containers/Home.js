import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Button, Col} from "react-bootstrap";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Auth, getUserById, deleteClassFromUser } from "../firebase";
import ClassModal from './Modal'

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState("");
  
  useEffect(() => {
    async function onLoad() {
      if (!Auth.currentUser) { return; }
      await getUserById(Auth.currentUser.email)
      .then(data => {
        setName(data.user);
        setClasses(data.classes);
      })
      .catch(err => alert(err));
  
      setIsLoading(false);
    }
  
    onLoad();
  },[]);
  
  function renderNotesList() {
    return(
    <div>
      <LinkContainer key="new" to="/notes/search">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Add a new class
          </h4>
        </ListGroupItem>
      </LinkContainer>
    
      <ListGroup>
        {classes.map(e=>renderClass(e))}
      </ListGroup>
    </div>
    );
  }
  function HandleClick(props){
    console.log("呃呃，还是删除"+props+"吧");
    deleteClassFromUser(props, Auth.currentUser.email);
  }
  function renderClass(props){
    return(
    <>
      <ListGroupItem key={props}>
        <Col md={11}>
          <ClassModal name={props}/>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Button onClick={()=>HandleClick(props)}>Delete</Button>
        </Col>
      </ListGroupItem>
    </>
    );
  }
  function renderLander() {
    return (
      <div className="lander">
        <h1>Metchup</h1>
        <p>A simple way to find study partner</p>
      </div>
    );
  }


  function renderNotes(props) {
    
    var message = <span><strong>Welcome</strong>, {props}</span>;
    return (
      <div className="notes">
        <PageHeader>{message}</PageHeader>
        <h4>Let's play around with your dashboard to find study groups.</h4>
        <ListGroup>
          {!isLoading && renderNotesList()}
        </ListGroup>
      </div>
    );
  }
  

  return (
    <div className="Home">
      {Auth.currentUser ? renderNotes("呃呃") : renderLander()}
    </div>
  );
}