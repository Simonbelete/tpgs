import React, { useEffect } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Chip, Container, Grid, Typography, Stack } from "@mui/material";
import { getNotificationByIdSSR } from "@/features/notification/services";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { NextPageContext } from "next";
import { Notification } from "@/models";
import dayjs from "dayjs";
import { useMarkAsReadMutation } from "@/features/notification/services";

const ViewNotificationPage = ({ data }: { data: Notification }) => {
  const { breadcrumbs } = useBreadcrumbs();

  const [markAsRead, result] = useMarkAsReadMutation();

  useEffect(() => {
    // Mark as read
    markAsRead(data.id);
  }, []);

  return (
    <>
      <SeoHead title="Farms" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">{data.verb}</Typography>}
      >
        <Container maxWidth="sm">
          <Grid container gap={2}>
            {/* Verb */}
            <Grid xs={12}>
              <Stack justifyContent="space-between" direction={"row"}>
                <Typography fontWeight={600}>Notification:</Typography>
                <Typography>{data.verb}</Typography>
              </Stack>
            </Grid>

            {/* Descriptions */}
            <Grid xs={12}>
              <Stack justifyContent="space-between" direction={"row"}>
                <Typography fontWeight={600}>Description:</Typography>
                <Typography>{data.description}</Typography>
              </Stack>
            </Grid>

            {/* Level */}
            <Grid xs={12}>
              <Stack justifyContent="space-between" direction={"row"}>
                <Typography fontWeight={600}>Level:</Typography>
                <Chip
                  label={data.level}
                  // @ts-ignore
                  color={data.level}
                  variant="filled"
                  size="small"
                />
              </Stack>
            </Grid>

            {/* Actor */}
            <Grid xs={12}>
              <Stack justifyContent="space-between" direction={"row"}>
                <Typography fontWeight={600}>Preformed By:</Typography>
                <Typography>{data.verb}</Typography>
              </Stack>
            </Grid>

            {/* Date */}
            <Grid xs={12}>
              <Stack justifyContent="space-between" direction={"row"}>
                <Typography fontWeight={600}>Date:</Typography>
                <Typography>
                  {dayjs(data?.timestamp).isValid()
                    ? dayjs(data?.timestamp).format(
                        process.env.NEXT_PUBLIC_DATE_TIME_FORMAT
                      )
                    : "-"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Notification>({
    context,
    id: Number(id),
    getByIdSSR: getNotificationByIdSSR,
  });
}

export default ViewNotificationPage;
