import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormulaIngredient, Ingredient } from "@/models";
import { Row, Column } from "../formulation/Formulation";

export const IngredientTable = ({ rows }: { rows: Row[] }) => {
  return (
    <TableContainer component={Paper}>
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
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Batch Weight (kg)
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Batch Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.display_name}
                </TableCell>
                <TableCell align="right">{row.ratio}</TableCell>
                <TableCell align="right">{row.unit_price}</TableCell>
                <TableCell align="right">{row.ration_weight}</TableCell>
                <TableCell align="right">{row.ration_price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
