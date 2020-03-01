import React from 'react'

const Courses = ({ courses }) => {
  return (
    <div>
      <center><h1>Course List</h1></center>
      {courses.map((courses) => (
        <div class="Course">
          <div class="course-info">
            <h5 class="course-title">{courses.title} </h5>
            <h5 class="course-name"> {courses.subject} - {courses.catalog_num}: {courses.topic}</h5>
            <h6 class="course-term">{courses.term}</h6>
            <h6 class="course-instructor">{courses.instructor}</h6>
            <h6 class="course-section"> Section {courses.section}</h6>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Courses
