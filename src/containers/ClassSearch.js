import React from "react";
import { ListGroup, ListGroupItem, Row, Col, Button } from "react-bootstrap";
import data from "../data/4770/courses.json";
import { useState } from 'react';
import "./ClassSearch.css";
import { Auth, addClassToUser } from "../firebase";

export default function ClassSearch(props) {

  const [input, setInput] = useState(null);

  const elementStyle ={
    borderRadius:'5px',
    position:'relative',
    marginTop:'5px',
    marginBottom:'10px'
  }

  function includes(course){
    return (course.title && course.title.toLowerCase().includes(input.toLowerCase()))
    || (course.subject && course.subject.toLowerCase().includes(input.toLowerCase()))
    || (course.catalog_num && course.catalog_num.toLowerCase().includes(input.toLowerCase()))
    || (course.topic && course.topic.toLowerCase().includes(input.toLowerCase()))
    || (course.instructor && course.instructor.toLowerCase().includes(input.toLowerCase()));
  }

  const courses = data.filter(course => {
    if(input == null){
        return course;
    }
    else if(course!=null && includes(course)){
        return course;
    }
  }).map(course => {
    return(
    <ListGroupItem  key={(course.id).toString()} className="Course" style={elementStyle}>
      <Row>
          <Col className="course-info" sm={9}>
              <h4 className="course-title"><strong>{course.subject} {course.catalog_num}: {course.title} </strong></h4>
              <h5 className="course-name"style={{color: 'grey'}}>{course.topic}</h5>
              <h6 className="course-term">{course.termId}</h6>
              <h6 className="course-instructor">{course.instructor}</h6>
              <h6 className="course-section"> Section {course.section}</h6>
          </Col>
          <Col sm={3}>
            <Button variant="outline-primary" 
            onClick={() => addClassToUser(course.id.toString(), Auth.currentUser.email)} block>
              Add to Dashboard
            </Button>
          </Col>
        </Row>
    </ListGroupItem>
    )
  });

  return (
    <div>
      <ListGroup>
        <input type="text" placeholder="Enter class to search" style={elementStyle} onChange={e => setInput(e.target.value)} block />
        {courses}
      </ListGroup>
    </div>
  );
}
