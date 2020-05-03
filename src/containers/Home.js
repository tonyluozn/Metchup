import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "../firebase";
import ClassModal from './Modal'

function loadNotes() {
  return API.get("notes", "/notes");
}

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!Auth.currentUser) { return; }
  
      try {
        // 从database抓列表
        //const notes = await loadNotes();
        //setNotes(notes);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  });
  
  function renderNotesList(notes) {
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
      <ListGroupItem>
        <ClassModal name="COMP_SCI 214"/>
      </ListGroupItem>
      <ListGroupItem>
        <ClassModal name="MATH 290-3"/>
      </ListGroupItem>
      <ListGroupItem>
        <ClassModal name="ECON 310-1"/>
      </ListGroupItem>
    </ListGroup>
  </div>
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
    console.log(props);
    var message = <span><strong>Welcome</strong>, {props}</span>;
    return (
      <div className="notes">
        <PageHeader>{message}</PageHeader>
        <h4>Let's play around with your dashboard to find study groups.</h4>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {Auth.currentUser ? renderNotes(Auth.currentUser.email) : renderLander()}
    </div>
  );
}