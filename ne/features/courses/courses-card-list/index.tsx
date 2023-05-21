"use client";

import React from "react";
import { Grid } from "@mui/material";
import Course from "@/interfaces/Course";
import CourseCard from "../components/CourseCard";

const CoursesCardList = (props: { courses: Course[] }) => {
  const { courses } = props;
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {courses.map((e, key) => (
        <Grid item xs={2} sm={4} md={4} key={key}>
          <CourseCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesCardList;
