describe("Change self password", () => {
  beforeEach(() => {
    cy.visit("/settings");
    cy.url().should("contain", "/ss");
  });

  it("Select change password tab", () => {
    cy.contains("setting").click();
  });
});
