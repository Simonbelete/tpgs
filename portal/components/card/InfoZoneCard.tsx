import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderProps,
  Divider,
  Typography,
  Grid,
  Stack,
  Skeleton,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DrawIcon from "@mui/icons-material/Draw";
import HistoryIcon from "@mui/icons-material/History";
import { AbstractSummary } from "@/models";
import dayjs from "dayjs";

const InfoZoneCardCard = ({
  isLoading,
  data,
}: {
  data?: AbstractSummary;
  isLoading?: boolean;
}) => {
  return (
    <Card
      sx={{
        px: 2,
        py: 2,
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        background: "#fff",
        borderRadius: "6px",
      }}
    >
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <EventNoteIcon fontSize="small" />
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography
              sx={{ mb: 0.5 }}
              fontWeight={400}
              variant="body2"
              color="text.light"
            >
              Date Created
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {isLoading ? (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              ) : (
                <>
                  {dayjs(data?.created_at).isValid()
                    ? dayjs(data?.created_at).format(
                        process.env.NEXT_PUBLIC_DATE_FORMAT
                      )
                    : "-"}
                </>
              )}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <AccountCircleIcon fontSize="small" />
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography
              sx={{ mb: 0.5 }}
              fontWeight={400}
              variant="body2"
              color="text.light"
            >
              Created by
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {isLoading ? (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              ) : (
                <Link href={`/users/${data?.created_by.id}`}>
                  {data?.created_by.name}
                </Link>
              )}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <EventRepeatIcon fontSize="small" />
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography
              sx={{ mb: 0.5 }}
              fontWeight={400}
              variant="body2"
              color="text.light"
            >
              Last updated
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {isLoading ? (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              ) : (
                <>
                  {dayjs(data?.last_updated_at).isValid()
                    ? dayjs(data?.last_updated_at).format(
                        process.env.NEXT_PUBLIC_DATE_FORMAT
                      )
                    : "-"}
                </>
              )}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <DrawIcon fontSize="small" />
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography
              sx={{ mb: 0.5 }}
              fontWeight={400}
              variant="body2"
              color="text.light"
            >
              Last Updated by
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {isLoading ? (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              ) : (
                <Link href={`/users/${data?.last_updated_by.id}`}>
                  {data?.last_updated_by.name || "-"}
                </Link>
              )}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <HistoryIcon fontSize="small" />
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography
              sx={{ mb: 0.5 }}
              fontWeight={400}
              variant="body2"
              color="text.light"
            >
              Histories
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {isLoading ? (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              ) : (
                <>{data?.history_count} Changes</>
              )}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default InfoZoneCardCard;
