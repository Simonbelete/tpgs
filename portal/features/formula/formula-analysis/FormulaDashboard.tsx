import { Formula } from "@/models";
import React, { useEffect, useState } from "react";
import {
  useLazyGetAllNutrientsOfIngredientQuery,
  useUpdateIngredientMutation,
} from "@/features/ingredients/services";
import {
  useLazyGetAllIngredientsOfFormulaQuery,
  useLazyGetAllRationsOfFormulaQuery,
  useLazyGetAllRequirementsOfFormulaQuery,
} from "../services";
import { Nutrient, FormulaRequirement, FormulaRation } from "@/models";
import _ from "lodash";
import { Row, Column } from "../formulation/Formulation";
import { Grid } from "@mui/material";
import { NutrientDistributions } from "./NutrientDistribuation";
import { useLazyGetAllNutrientsQuery } from "@/features/nutrients/services";
import { PriceContribution } from "./PriceContribution";
import { IngredientRation } from "./IngredientRation";
import { IngredientBoundary } from "./IngredientBoundary";
import AchivementCard from "../formula-form/AchivementCard";
import { IngredientTable } from "./IngredientTable";
import { FormulaAchivement } from "./FormulaAchivement";
import { RationVsRequirement } from "./RationVsRequirement";

export const FormulaDashboard = ({ data }: { data: Formula }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const [ration, setRation] = useState<Row>({
    rowId: "ration",
    display_name: "Ration",
  });
  const [requirement, setRequirement] = useState<Row>({
    rowId: "requirement",
    display_name: "Requirement",
    ration_weight: 100,
    nutrients: {},
  });

  const [getAllNutrients, { isFetching: isFetchingGetAllNutrients }] =
    useLazyGetAllNutrientsQuery();
  const [getAllIngredientOfFormula] = useLazyGetAllIngredientsOfFormulaQuery();
  const [getAllNutrientsOfIngredient] =
    useLazyGetAllNutrientsOfIngredientQuery();
  const [getAllRationsOfFormula] = useLazyGetAllRationsOfFormulaQuery();
  const [getAllRequirementsOfFormula] =
    useLazyGetAllRequirementsOfFormulaQuery();

  useEffect(() => {
    loadNutrients();
    loadIngredients();
    loadRations();
    loadRequirements();
  }, []);

  const loadNutrients = async () => {
    const response = await getAllNutrients({}).unwrap();
    if (response) {
      const cols = response.results.map(
        (e) =>
          ({
            id: e.abbreviation,
            colId: e.id,
            title: e.display_name,
            path: `nutrients.${e.abbreviation}.value`,
            pathId: `nutrients.${e.abbreviation}.id`,
          } as Column)
      );
      setColumns(cols);
    }
  };

  const loadIngredients = async () => {
    const response = await getAllIngredientOfFormula({
      id: data.id,
    }).unwrap();

    const formulaIngredients = response.results;

    const newRows: Row[] = [];

    const requests = _.map(formulaIngredients, (e) => {
      const ing_id = _.get(e, "ingredient.id", 0);

      return getAllNutrientsOfIngredient({
        id: ing_id,
        query: {},
      }).unwrap();
    });

    const responses = await Promise.all(requests);

    _.forEach(responses, (e, i) => {
      const ing = _.get(formulaIngredients, i, {});

      const nutrients = {};

      _.forEach(e.results, (n) => {
        const nutrient = n.nutrient as Nutrient;
        const abbreviation: string = nutrient.abbreviation;
        const val = _.get(n, "value", 0);
        _.set(nutrients, abbreviation, {
          id: nutrient.id,
          value: val,
        });
      });

      newRows.push({
        id: _.get(ing, "ingredient.id", 0),
        rowId: _.get(ing, "id", ""),
        display_name: _.get(ing, "ingredient.display_name", ""),
        ration: _.get(ing, "ration", 0),
        unit_price: _.get(ing, "unit_price", 0),
        dm: _.get(ing, "ingredient.dm", 0),
        min: _.get(ing, "ingredient.min", 0),
        max: _.get(ing, "ingredient.max", 0),
        nutrients: nutrients,
        ratio: _.get(ing, "ration", 0),
        // formula ingredient fields
        ration_price: _.get(ing, "ration_price", 0),
        ration_weight: _.get(ing, "ration_weight", 0),
      });
    });

    setRows(newRows);
  };

  const loadRations = async () => {
    if (data == null) return;

    const response = await getAllRationsOfFormula({ id: data.id }).unwrap();

    const newRow: Row & Partial<FormulaRation> = {
      id: data.id,
      rowId: "ration",
      display_name: "Ration",
      ration: data.ration_ratio,
      unit_price: 0,
      ration_price: data.ration_price,
      ration_weight: data.ration_weight,
      dm: data.ration_dm,
      nutrients: {},
    };

    for (let i = 0; i < response.results.length; i += 1) {
      const nutrient = response.results[i].nutrient as Nutrient;
      const abbreviation: string = (response.results[i].nutrient as Nutrient)
        .abbreviation;
      const val = _.get(response.results[i], "value", 0);
      _.set(newRow, `nutrients.${abbreviation}`, {
        id: nutrient.id,
        value: val,
      });
    }

    setRation(newRow);
  };

  const loadRequirements = async () => {
    if (data == null) return;

    const response = await getAllRequirementsOfFormula({
      id: data.id,
    }).unwrap();

    const newRow: Row & Partial<FormulaRequirement> = {
      id: data.id,
      rowId: _.get(data.requirement, "id", "requirement"),
      display_name: _.get(data.requirement, "name", "Requirement"),
      ration: data.desired_ratio,
      unit_price: 0,
      ration_price: data.budget,
      ration_weight: data.weight,
      dm: data.desired_dm,
      nutrients: {},
    };

    for (let i = 0; i < response.results.length; i += 1) {
      const nutrient = response.results[i].nutrient as Nutrient;
      const abbreviation: string = (response.results[i].nutrient as Nutrient)
        .abbreviation;
      const val = _.get(response.results[i], "value", 0);
      _.set(newRow, `nutrients.${abbreviation}`, {
        id: nutrient.id,
        value: val,
      });
    }

    setRequirement(newRow);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AchivementCard data={data} />
      </Grid>
      <Grid item xs={12}>
        <NutrientDistributions rows={rows} columns={columns} />
      </Grid>
      <Grid item xs={6}>
        <PriceContribution rows={rows} columns={columns} />
      </Grid>
      <Grid item xs={6}>
        <IngredientRation rows={rows} columns={columns} />
      </Grid>
      <Grid item xs={12}>
        <IngredientBoundary rows={rows} columns={columns} />
      </Grid>
      <Grid item xs={12}>
        <FormulaAchivement ration={ration} requirement={requirement} />
      </Grid>
      <Grid item xs={12}>
        <RationVsRequirement ration={ration} requirement={requirement} />
      </Grid>
      <Grid item xs={12}>
        <IngredientTable rows={rows} />
      </Grid>
    </Grid>
  );
};
