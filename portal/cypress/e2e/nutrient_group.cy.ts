/// <reference types="cypress" />

describe("Nutrient Group CRUD", () => {
  before(() => {
    cy.fixture("nutrient_group").then((data) => {
      this.data = data;
    });
  });

  it("Create nutrient group", () => {
    cy.visit("/nutrient-groups/create");

    cy.url().should("contain", "/nutrient-groups/create");

    cy.get("[name=name]").type(this.data.name);
    cy.get("[data-testid=data-submit]").click();
    cy.url().should("contain", "/nutrient-groups");
  });

  it("List nutrient group", () => {
    cy.visit("/nutrient-groups");
    cy.url().should("contain", "/nutrient-groups");

    cy.get("[data-testid=data-search]").type(this.data.name);
    cy.get("[data-testid=data-table]").should("contain", this.data.name);

    cy.get("[data-testid=data-table]")
      .contains(this.data.name)
      .get("[data-testid=data-table-history]")
      .click();

    cy.url().should("contain", "history");
  });

  it("Edit nutrient group", () => {
    cy.visit("/nutrient-groups");
    cy.url().should("contain", "/nutrient-groups");

    cy.get(".pts-list-filter-search").type(this.data.name);
    cy.get(".pts-list").should("contain", this.data.name);
  });

  it("Delete nutrient group", () => {
    cy.visit("/nutrient-groups");
    cy.url().should("contain", "/nutrient-groups");

    cy.get(".pts-list-filter-search").type(this.data.name);
    cy.get(".pts-list").should("contain", this.data.name);
  });

  it("Deactivate nutrient group", () => {
    cy.visit("/nutrient-groups");
    cy.url().should("contain", "/nutrient-groups");

    cy.get(".pts-list-filter-search").type(this.data.name);
    cy.get(".pts-list").should("contain", this.data.name);
  });

  it("History List nutrient group", () => {
    cy.visit("/nutrient-groups");
    cy.url().should("contain", "/nutrient-groups");

    cy.get(".pts-list-filter-search").type(this.data.name);
    cy.get(".pts-list").should("contain", this.data.name);
  });
});
