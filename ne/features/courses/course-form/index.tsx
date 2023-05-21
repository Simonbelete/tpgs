"use client";

import React, { useEffect, useRef } from "react";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Box, Grid, Button } from "@mui/material";
import Course from "@/interfaces/Course";
import WYSUIWYGEditor from "@/components/WYSUIWYGEditor";
import axios from "axios";
import { useRouter } from "next/navigation";

type Inputs = Partial<Course>;

const schema = object({}).required();

const CourseForm = (props: { course: Course }) => {
  const { course } = props;
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const contentRef_EN = useRef<any>(null);
  const router = useRouter();

  // useEffect(() => {
  //   setValue("title_en", course.title_en);
  //   setValue("title_am", course.title_am);
  //   setValue("title_sw", course.title_sw);

  //   setValue("coverImage", course.coverImage);
  //   setValue("coverImage_en", course.coverImage_en);
  //   setValue("coverImage_am", course.coverImage_am);
  //   setValue("coverImage_sw", course.coverImage_sw);

  //   setValue("content_en", course.content_en);
  //   setValue("content_am", course.content_am);
  //   setValue("content_sw", course.content_sw);
  // }, [course]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("--------------------------------");
    console.log(contentRef_EN.current.getContent());
    const response = await axios.post("/api/courses/" + course.id, {
      ...data,
      content_en: contentRef_EN.current.getContent(),
    });
    if (response.status == 200) router.push("/courses");
    else console.log(response);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4} direction="column">
        <Grid item xs={12}>
          <Controller
            name={"title_en"}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                error={!!error?.message}
                helperText={error?.message}
                onChange={onChange}
                value={value}
                label={"Title - English"}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name={"title_am"}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                error={!!error?.message}
                helperText={error?.message}
                onChange={onChange}
                value={value}
                label={"Title - Amharic"}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name={"title_sw"}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                error={!!error?.message}
                helperText={error?.message}
                onChange={onChange}
                value={value}
                label={"Title - Swahili"}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <WYSUIWYGEditor ref={contentRef_EN} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseForm;
