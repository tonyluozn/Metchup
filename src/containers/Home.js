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
  
  useEffect(() => {
    async function onLoad() {
      if (!Auth.currentUser) { return; }
      await getUserById(Auth.currentUser.email)
      .then(data => {
        setName(data.name);
        setClasses(data.classes);
      })
  
      setIsLoading(false);
    }
  
    onLoad();
  },[isLoading]);
  
  function renderClassList() {
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
        {classes.map(clsId => renderClass(clsId))}
      </ListGroup>
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
    //console.log("呃呃，还是删除"+props+"吧");
    deleteClassFromUser(props, Auth.currentUser.email);
    setIsLoading(true);
  }
  
  function renderClass(clsId){
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