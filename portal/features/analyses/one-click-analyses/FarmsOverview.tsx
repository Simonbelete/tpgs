import React, { useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  CardContent,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";
import { Directory } from "@/models";
import _ from "lodash";
import directoryToLabel from "@/util/directoryToLabel";

// ChickenSummary
const FarmsOverView = ({ data, filters }: { data: any; filters: any }) => {
  const calcPercentage = (x: number, y: number) => {
    if (y == 0) return 0;
    return Number(((x / y) * 100).toFixed(1));
  };

  return (
    <>
      <Grid container direction={"row"} gap={4}>
        {data &&
          data.map((e: any, i: any) => {
            const male_p = calcPercentage(
              _.get(e, "sex.M", 0),
              _.get(e, "chicken.total", 0)
            );
            const female_p = calcPercentage(
              _.get(e, "sex.F", 0),
              _.get(e, "chicken.total", 0)
            );
            const unknown_p = calcPercentage(
              _.get(e, "sex.Unknown", 0),
              _.get(e, "chicken.total", 0)
            );

            const alive_p = calcPercentage(
              _.get(e, "chicken.alive", 0),
              _.get(e, "chicken.total", 0)
            );
            const dead_p = calcPercentage(
              _.get(e, "chicken.dead", 0),
              _.get(e, "chicken.total", 0)
            );

            return (
              <Grid item xs={12} md={4} lg={3} xl={2} key={i}>
                <Card sx={{ display: "flex" }}>
                  <CardContent sx={{ width: "100%" }}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                      >
                        Total: {_.get(e, "total_chickens", 0)}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                      >
                        {_.get(e, "min_week", 0)} - {_.get(e, "max_week", 0)}{" "}
                        Week
                      </Typography>
                    </Stack>
                    <Typography variant="h6" component="div">
                      {directoryToLabel(filters[i])}
                    </Typography>

                    <Box mt={1}>
                      <Typography variant="caption" fontWeight={600} mb={1}>
                        Sex
                      </Typography>
                      <div
                        className="stacked-bar-chart"
                        style={{
                          gridTemplateColumns: `${male_p}fr ${female_p}fr ${unknown_p}fr`,
                        }}
                      >
                        <Tooltip
                          title={`Male ${male_p}% (${_.get(e, "sex.M", 0)})`}
                        >
                          <div style={{ background: "#ecc94b" }}>{male_p}%</div>
                        </Tooltip>
                        <Tooltip
                          title={`Female ${female_p}% (${_.get(
                            e,
                            "sex.F",
                            0
                          )})`}
                        >
                          <div style={{ background: "#ed8936" }}>
                            {female_p}%
                          </div>
                        </Tooltip>
                        <Tooltip
                          title={`Unknown ${unknown_p}% (${_.get(
                            e,
                            "sex.Unknown",
                            0
                          )})`}
                        >
                          <div style={{ background: "#e53e3e" }}>
                            {unknown_p}%
                          </div>
                        </Tooltip>
                      </div>
                    </Box>

                    <Box mt={1}>
                      <Typography
                        display={"inline-flex"}
                        variant="caption"
                        fontWeight={600}
                        mb={1}
                      >
                        Chicken
                      </Typography>
                      <div
                        className="stacked-bar-chart"
                        style={{
                          gridTemplateColumns: `${alive_p}fr ${dead_p}fr`,
                        }}
                      >
                        <Tooltip
                          title={`Alive ${alive_p}% (${_.get(
                            e,
                            "chicken.alive",
                            0
                          )})`}
                        >
                          <div style={{ background: "#334D5C" }}>
                            {alive_p}%
                          </div>
                        </Tooltip>

                        <Tooltip
                          title={`Dead ${dead_p}% (${_.get(
                            e,
                            "chicken.dead",
                            0
                          )})`}
                        >
                          <div style={{ background: "#962D3E" }}>{dead_p}%</div>
                        </Tooltip>
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default FarmsOverView;
