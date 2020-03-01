import React from "react";
import data from "../data/4770/courses.json";
import "./ClassSearch.css";
import Courses from '../components/Courses';

export default function ClassSearch(props) {

  return (
      <Courses courses={data} />
  )
}