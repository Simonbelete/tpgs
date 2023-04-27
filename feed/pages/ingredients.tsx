import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import NavBar from "./components/Navbar";
import IngredientForm from "./components/IngredientForm";

const Ingredients = () => {
  return (
    <>
      <NavBar />
      <Box component="main" mt={5}>
        <Container>
          <IngredientForm />
        </Container>
      </Box>
    </>
  );
};

export default Ingredients;
