"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const CreateCourseButton = () => {
  return (
    <Link href="/courses/create">
      <Button>Create Course</Button>
    </Link>
  );
};

export default CreateCourseButton;
