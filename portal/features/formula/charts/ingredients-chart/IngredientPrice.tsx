import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormulaIngredient, Ingredient } from "@/models";

export default function DenseTable({ data }: { data: FormulaIngredient[] }) {
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
          {data &&
            data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {(row.ingredient as Ingredient).name || ""}
                </TableCell>
                <TableCell align="right">{row.ration}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.ration_weight}</TableCell>
                <TableCell align="right">{row.ration_price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
