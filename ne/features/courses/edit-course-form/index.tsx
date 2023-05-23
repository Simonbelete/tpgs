"use client";

import React, { useEffect, useRef } from "react";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Box, Grid, Button, Tab, Tabs } from "@mui/material";
import Course from "@/interfaces/Course";
import WYSUIWYGEditor from "@/components/WYSUIWYGEditor";
import axios from "axios";
import { useRouter } from "next/navigation";

type Inputs = Partial<Course>;

const schema = object({}).required();

const EditCourseForm = (props: { course: Course }) => {
  const { course } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
  const contentRef_AM = useRef<any>(null);
  const contentRef_SW = useRef<any>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("AAAAAAAAAAAAAAAAAAAAa");
    console.log(contentRef_AM.current);
    const response = await axios.post("/api/courses/" + course.id, {
      ...data,
      content_en:
        contentRef_EN.current == null
          ? course.content_en
          : contentRef_EN.current.getContent(),
      content_am:
        contentRef_AM.current == null
          ? course.content_am
          : contentRef_AM.current.getContent(),
      content_sw:
        contentRef_SW.current == null
          ? course.content_sw
          : contentRef_SW.current.getContent(),
    });
    if (response.status == 200) router.push("/courses");
    else console.log(response);
  };

  useEffect(() => {
    setValue("title_en", course.title_en);
    setValue("title_am", course.title_am);
    setValue("title_sw", course.title_sw);

    setValue("coverImage", course.coverImage);
    setValue("coverImage_en", course.coverImage_en);
    setValue("coverImage_am", course.coverImage_am);
    setValue("coverImage_sw", course.coverImage_sw);

    contentRef_EN.current = course.content_en;
    contentRef_AM.current = course.content_am;
    contentRef_SW.current = course.content_sw;
  }, [course]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 5 }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="English" />
            <Tab label="Amharic" />
            <Tab label="Swahili" />
          </Tabs>
        </Box>
        {/* English */}
        {tabValue == 0 && (
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
                    fullWidth
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    value={value}
                    label={"Title - English"}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"coverImage_en"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    fullWidth
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    value={value}
                    label={"Cover Image - English"}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <WYSUIWYGEditor
                ref={contentRef_EN}
                initialValue={course.content_en}
              />
            </Grid>
          </Grid>
        )}
        {/* Amharic */}
        {tabValue == 1 && (
          <Grid container spacing={4} direction="column">
            <Grid item xs={12}>
              <Controller
                name={"title_am"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    fullWidth
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    value={value}
                    label={"Title - Amharic"}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"coverImage_am"}
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
                    label={"Cover Image - Swahili"}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <WYSUIWYGEditor
                ref={contentRef_AM}
                initialValue={course.content_am}
              />
            </Grid>
          </Grid>
        )}
        {/* Swahili */}
        {tabValue == 2 && (
          <Grid container spacing={4} direction="column">
            <Grid item xs={12}>
              <Controller
                name={"title_sw"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    fullWidth
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    value={value}
                    label={"Title - Swahili"}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"coverImage_sw"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    fullWidth
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    value={value}
                    label={"Cover Image - Swahili"}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <WYSUIWYGEditor
                ref={contentRef_SW}
                initialValue={course.content_sw}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <Grid item xs={12}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default EditCourseForm;
