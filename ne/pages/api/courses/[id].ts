import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method == "POST") {
    const data = req.body;
    const updatedData = await prisma.course.update({
      where: { id: Number(id) },
      data: data,
    });
    res.status(200).json(updatedData);
  } else if (req.method == "DELETE") {
  }
  res.end(`${id}`);
}
