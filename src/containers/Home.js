import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Button, Col} from "react-bootstrap";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Auth, getUserById, deleteClassFromUser } from "../firebase";
import ClassModal from './Modal'
import courseData from "../data/4770/courses.json";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState("");
  
  useEffect(() => {onLoad()}, [isLoading, user]);
  Auth.onAuthStateChanged(() => setUser(Auth.currentUser));

  async function onLoad() {
    if (!Auth.currentUser) { return; }
    await getUserById(Auth.currentUser.email)
    .then(data => {
      setName(data.name);
      setClasses(data.classes);
    }).catch(err => alert(err));

    setIsLoading(false);
  }

  //pass user to /message
  var path = {
    pathname:'/message',
    query: name,
  }

  function renderClassList() {
    return(
    <div>
      <LinkContainer key="new" to="/search">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Add a new class
          </h4>
        </ListGroupItem>
      </LinkContainer>
    
      <ListGroup>
        {classes.map(clsId => renderClass(clsId))}
      </ListGroup>
      
      <LinkContainer to={path}>
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Send Message
          </h4>
        </ListGroupItem>
      </LinkContainer>
    </div>
    );
  }

  function searchClassAttribute(id){
    for(var i = 0; i < courseData.length; i++){
      if(courseData[i].id == id){
        var classAttribute = courseData[i].subject + " " + courseData[i].catalog_num;
        return classAttribute;
      }
    }
  }

  function handleClick(props){
    deleteClassFromUser(props, Auth.currentUser.email);
    setIsLoading(true);
  }
  
  function renderClass(clsId){
    //pass the data?
    //props.history.push(path);
    return(
    <>
      <ListGroupItem key={clsId.toString()}>
        <Col md={11}>
          <ClassModal name={searchClassAttribute(clsId)} id={clsId}/>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Button onClick={()=>handleClick(clsId)}>Delete</Button>
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


  function renderDashboard() {
    var message = <span><strong>Welcome, {name}.</strong></span>;
    return (
      <div className="notes">
        <PageHeader>{message}</PageHeader>
        <h4>Let's play around with your dashboard to find study groups.</h4>
        <ListGroup>
          {!isLoading && renderClassList()}
        </ListGroup>
      </div>
    );
  }
  

  return (
    <div className="Home">
      {Auth.currentUser ? renderDashboard() : renderLander()}
    </div>
  );
}