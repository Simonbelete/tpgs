import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieChartSkeleton } from "@/components";
import { Row, Column } from "../formulation/Formulation";
import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const PricePerNutrient = ({
  rows,
  columns,
}: {
  rows: Row[];
  columns: Column[];
}) => {
  const roundTo3DecimalPlace = (value: number): number => {
    return Number(value.toFixed(3));
  };

  return (
    <TableContainer>
      <Table sx={{ height: "100%" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Ingredient</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              %
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Unit Price (kg)
            </TableCell>
            {columns &&
              columns.map((el, key) => (
                <TableCell key={key} align="right" sx={{ fontWeight: 600 }}>
                  {el.title}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((el, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.display_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {_.get(el, "ratio", 0)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {el.unit_price}
                </TableCell>
                {columns.map((cl, key2) => (
                  <TableCell key={key2} align="right">
                    {roundTo3DecimalPlace(
                      ((_.get(el, cl.path, 0) * _.get(el, "ratio", 0)) / 100) *
                        _.get(el, "unit_price", 0)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
