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

const CreateCourseForm = () => {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post("/api/courses/", {
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

export default CreateCourseForm;
