import React, { useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import Course from "@/interfaces/Course";
import { CoursesCardList, CreateCourseButton } from "@/features/courses";

async function getData(): Promise<Course[]> {
  const prisma = new PrismaClient();
  const result = await prisma.course.findMany();
  return result as Course[];
}

export default async function Page() {
  const data: Course[] = await getData();

  return (
    <section>
      <h1>Courses List</h1>
      <CreateCourseButton />
      <CoursesCardList courses={data} />
    </section>
  );
}
