import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useLazyGetChickensRankingQuery,
  useGetChickensRankingQuery,
} from "../services";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import buildPage from "@/util/buildPage";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import _ from "lodash";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ChickenRanking, Hatchery } from "@/models";
import { addSelectedChicken, removeSelectedChicken } from "./slice";

export const ChickenSelect = () => {
  const [pageModel, setPageModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection);

  const { data, refetch } = useGetChickensRankingQuery({
    ...buildPage(pageModel),
    chicken__hatchery__in: _.map(
      (selection?.selected_from || []) as Hatchery[],
      (e) => e.id
    ).join(","),
  });

  const hasMore =
    pageModel.page < Math.floor((data?.count || 0) / pageModel.pageSize);

  const loadMore = () => {
    const newPageModel = { ...pageModel, page: pageModel.page + 1 };
    setPageModel({ ...pageModel, page: pageModel.page + 1 });
  };

  useEffect(() => {
    refetch();
  }, [pageModel]);

  const deSelectChicken = (r: ChickenRanking) => {
    dispatch(addSelectedChicken(r.id));
  };

  const selectChicken = (r: ChickenRanking) => {
    dispatch(removeSelectedChicken(r.id));
  };

  return (
    <InfiniteScroll
      dataLength={data?.results.length || 0} //This is important field to render the next data
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={400}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>End! You have seen it all</b>
        </p>
      }
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tag</TableCell>
              <TableCell align="right">Body Weight Avg&nbsp;(g)</TableCell>
              <TableCell align="right">Feed Weight&nbsp;(g)</TableCell>
              <TableCell align="right">Egg Number Avg&nbsp;(g)</TableCell>
              <TableCell align="right">Egg Weight Avg&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Stack direction="row">
                    {_.includes(
                      (selection?.selected_chickens || []) as number[],
                      row.id
                    ) ? (
                      <IconButton
                        size="small"
                        onClick={() => selectChicken(row)}
                        color="primary"
                      >
                        <CheckBoxIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => deSelectChicken(row)}
                      >
                        <CheckBoxOutlineBlankIcon fontSize="small" />
                      </IconButton>
                    )}

                    <IconButton size="small">
                      <BarChartIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell component="th" scope="row">
                  {_.get(row.chicken, "display_name")}
                </TableCell>
                <TableCell align="right">{row.feed_weight_avg}</TableCell>
                <TableCell align="right">{row.body_weight_avg}</TableCell>
                <TableCell align="right">{row.egg_number_avg}</TableCell>
                <TableCell align="right">{row.egg_weight_avg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};
