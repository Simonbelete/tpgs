import React, { useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import Course from "@/interfaces/Course";

async function getData() {
  const prisma = new PrismaClient();
  const result = await prisma.course.findMany();
  return result;
}

export default async function Page() {
  const data: Course[] = await getData();

  return (
    <section>
      <h1>Courses List</h1>
      {data.map((e, key: any) => (
        <p key={key}>{e.title_am}</p>
      ))}
    </section>
  );
}
