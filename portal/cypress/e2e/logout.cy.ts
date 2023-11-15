describe("Testing Logout", () => {
  it("Logout from dashbaord menu", () => {
    cy.visit("/dashbaord");
    cy.get("#logout").click();
    cy.url().should("contain", "/");
  });

  it("Logout from sidebar menu", () => {
    cy.visit("/dashbaord");
    cy.get(".sidebar > #logout").click();
    cy.url().should("contain", "/");
  });
});
