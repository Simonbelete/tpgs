import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "POST") {
      const data = req.body;
      const updatedData = await prisma.course.create({
        data: data,
      });
      res.status(200).json(updatedData);
    } else {
      const result = await prisma.course.findMany();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
}
