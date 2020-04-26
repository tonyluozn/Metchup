import React from "react";
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
  const courses = data.filter((data)=>{
    if(input == null)
        return data
    else if(data.title.toLowerCase().includes(input.toLowerCase()) || data.subject.toLowerCase().includes(input.toLowerCase())){
        return data
    }
  }).map(data=>{
    return(
    <div class="Course">
      <div class="course-info">
        <h5 class="course-title">{data.title} </h5>
        <h5 class="course-name"> {data.subject} {data.catalog_num}: {data.topic}</h5>
        <h6 class="course-term">{data.term}</h6>
        <h6 class="course-instructor">{data.instructor}</h6>
        <h6 class="course-section"> Section {data.section}</h6>
      </div>
    </div>
    )
  })

  return (
      <div>
      <input type="text" placeholder="Enter class" style={elementStyle} onChange={(e)=>setString(e)} />
      {courses}      
      <Courses courses={data} />   
      </div>
      
  )

  
}