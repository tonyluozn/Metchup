import React from "react";
import { PageHeader, ListGroup, ListGroupItem, Row, Col, Button } from "react-bootstrap";
import data from "../data/4770/courses.json";
import { useState } from 'react';
import "./ClassSearch.css";
import { Auth, addClassToUser } from "../firebase";

export default function ClassSearch(props) {

  const [input, setString] = useState(null);

  const elementStyle ={
    borderRadius:'5px',
    position:'relative',
    marginTop:'5px',
    marginBottom:'10px'
  }

  function includes(course_data,search_input){
    if(course_data.title != null && course_data.title.toLowerCase().includes(search_input.toLowerCase())){
      return true;
    } else if(course_data.subject != null && course_data.subject.toLowerCase().includes(search_input.toLowerCase())) {
      return true;
    } else if(course_data.catalog_num != null && course_data.catalog_num.toLowerCase().includes(search_input.toLowerCase())) {
      return true;
    } else if(course_data.topic != null && course_data.topic.toLowerCase().includes(search_input.toLowerCase())) {
      return true;
    } else if(course_data.instructor != null && course_data.instructor.toLowerCase().includes(search_input.toLowerCase())) {
      return true;
    } else if(course_data.term != null && course_data.term.toLowerCase().includes(search_input.toLowerCase())) {
      return true;
    }
  }

  const courses = data.filter((data)=>{
    if(input == null)
        return data;
    else if(data!=null && includes(data,input)){
        return data;
    }
  }).map(data=>{
    return(
    <ListGroupItem  key={(data.id).toString()} className="Course" style={elementStyle}>
      <Row>
          <Col className="course-info" sm={9}>
              <h4 className="course-title"><strong>{data.subject} {data.catalog_num}: {data.title} </strong></h4>
              <h5 className="course-name"style={{color: 'grey'}}>{data.topic}</h5>
              <h6 className="course-term">{data.termId}</h6>
              <h6 className="course-instructor">{data.instructor}</h6>
              <h6 className="course-section"> Section {data.section}</h6>
          </Col>
          <Col sm={3}>
            <Button variant="outline-primary" onClick={() => addClassToUser((data.id).toString(), Auth.currentUser.email)} block>
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
        <input type="text" placeholder="Enter class to search" style={elementStyle} onChange={(e)=>setString(e.target.value)} />
        {courses}
      </ListGroup>
    </div>
  );
}
