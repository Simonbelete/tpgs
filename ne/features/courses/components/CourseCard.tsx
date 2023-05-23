import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CourseCard = ({
  id,
  title,
  image,
  content,
}: {
  id: number;
  title: string;
  image: string;
  content?: string;
}) => {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => {
          router.push("/courses/edit/" + id);
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={"images/" + image}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
