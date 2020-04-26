import React from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import data from "../data/4770/courses.json";
import { useState } from 'react';
import "./ClassSearch.css";
import Courses from '../components/Courses';

export default function ClassSearch(props) {

  const [input, setString] = useState(null);

  const elementStyle ={
    border:'solid',
    borderRadius:'10px',
    position:'relative',
    left:'10vh',
    height:'3vh',
    width:'20vh',
    marginTop:'5vh',
    marginBottom:'10vh'
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
    else if(includes(data,input)){
        return data;
    }
  }).map(data=>{
    return(
    <ListGroupItem class="Course">
      <div class="course-info">
          <h4 class="course-title"><strong>{data.title} </strong></h4>
          <h5 class="course-name"> {data.subject} {data.catalog_num}: {data.topic}</h5>
          <h6 class="course-term">{data.term}</h6>
          <h6 class="course-instructor">{data.instructor}</h6>
          <h6 class="course-section"> Section {data.section}</h6>
      </div>
    </ListGroupItem>
    )
  })

  return (
      <ListGroup>
      <input type="text" placeholder="Enter class" onChange={(e)=>setString(e.target.value)} />
      {courses}      
      </ListGroup>
      
  )

  
}