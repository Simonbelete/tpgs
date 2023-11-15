/// <reference types="cypress" />

import { viewports } from "../../dimensions";
import siteMetadata from "../../../data/siteMetadata";

describe("House Page", () => {
  it("List houses", () => {
    cy.visit("/houses");
    cy.contains("Houses");
  });
  // Object.values(viewports).map((key, i) => {

  //   it("Scrolling", () => {
  //     cy.vieswport(key.width, key.height);
  //     cy.visit("/houses");
  //   });
  // });
});
