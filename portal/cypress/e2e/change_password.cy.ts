describe("Change self password", () => {
  beforeEach(() => {
    cy.visit("/settings");
    cy.url().contains("/settings");
  });

  it("Select change password tab", () => {
    cy.contains("CHANGE PASSWORD").click();
  });
});
