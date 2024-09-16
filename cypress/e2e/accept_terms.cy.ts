describe("Accepting terms and conditions", () => {
  it("Modal is visible on first visit", () => {
    cy.visit("http://localhost:3000/informatics/PIPE-5195-dementia-risk");
    cy.contains("Terms and Conditions");
    cy.get("button").contains("Accept");
  });

  it("Modal is visible on other pages", () => {
    cy.visit("http://localhost:3000/informatics/PIPE-5195-dementia-risk/about");
    cy.contains("Terms and Conditions");
    cy.get("button").contains("Accept");
  });

  it("Modal disappears after clicking accept, cookie is set", () => {
    cy.visit("http://localhost:3000/informatics/PIPE-5195-dementia-risk");
    cy.contains("Terms and Conditions");
    cy.get("button").contains("Accept").click();
    cy.contains("Terms and Conditions").should("not.exist");
    cy.getCookie("accepted_terms").should("exist");
    cy.getCookie("accepted_terms").should("have.property", "value", "true");
  });

  it("After clicking accept, modal doesn't appear on other pages", () => {
    cy.visit("http://localhost:3000/informatics/PIPE-5195-dementia-risk");
    cy.contains("Terms and Conditions");
    cy.get("button").contains("Accept").click();
    cy.contains("Terms and Conditions").should("not.exist");
    cy.visit("http://localhost:3000/informatics/PIPE-5195-dementia-risk/about");
    cy.contains("Terms and Conditions").should("not.exist");
  });

  it("Modal should not be visible if cookie is already set", () => {
    cy.setCookie("accepted_terms", "true");
    cy.visit("http://localhost:3000/informatics/PIPE-5195-dementia-risk");
    cy.contains("Terms and Conditions").should("not.exist");
  });
});
