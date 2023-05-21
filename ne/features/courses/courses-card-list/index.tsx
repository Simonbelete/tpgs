"use client";

import React from "react";
import { Grid } from "@mui/material";
import Course from "@/interfaces/Course";
import CourseCard from "../components/CourseCard";

const CoursesCardList = (props: { courses: Course[] }) => {
  const local = "en";
  const { courses } = props;
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {courses.map((e, key) => (
        <Grid item xs={2} sm={4} md={4} key={key}>
          {loadcard(e)}
        </Grid>
      ))}
    </Grid>
  );

  function loadcard(course: Course) {
    if (local == "en") {
      return (
        <CourseCard
          id={course.id}
          title={course.title_en}
          image={course.coverImage_en}
        />
      );
    } else if (local == "am") {
      return (
        <CourseCard
          id={course.id}
          title={course.title_am}
          image={course.coverImage_am}
        />
      );
    } else if (local == "sw") {
      return (
        <CourseCard
          id={course.id}
          title={course.title_sw}
          image={course.coverImage_sw}
        />
      );
    }
    return null;
  }
};

export default CoursesCardList;
