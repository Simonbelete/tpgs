import React, { useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import Course from "@/interfaces/Course";

async function getData(id: number): Promise<Course | null> {
  const prisma = new PrismaClient();
  const result = await prisma.course.findUnique({
    where: { id: Number(id) },
  });
  return result as Course | null;
}

export default async function Page({ params }: { params: { id: number } }) {
  const data: Course | null = await getData(params.id);

  return (
    <section>
      <h1>Courses</h1>
      {data?.title_am}
    </section>
  );
}
