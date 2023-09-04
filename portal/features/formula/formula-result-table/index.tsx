import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { FormulaIngredient } from "@/models";

const FormulaResultTable = ({
  rows,
}: {
  rows: Partial<FormulaIngredient>[];
}) => {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined" square sx={{my: 3}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 600}} >
              Ingredient
            </TableCell>
            <TableCell align="right"  sx={{fontWeight: 600}}>Weight [Kg]</TableCell>
            <TableCell align="right"  sx={{fontWeight: 600}}>Price [\Kg]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ingredient}
              </TableCell>
              <TableCell align="right">{row.ration_weight}</TableCell>
              <TableCell align="right">{row.ration_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FormulaResultTable;
