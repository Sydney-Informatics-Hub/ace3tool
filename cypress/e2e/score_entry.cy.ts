describe("Score Entry", () => {
  beforeEach(() => {
    cy.setCookie("accepted_terms", "true");
  });

  it("Invalid score raises an error message", () => {
    cy.visit("/");
    cy.get("#attention_input").type("30");
    cy.contains("The score for Attention should be between 0 and 18");
  });

  it("Reset button resets scores", () => {
    cy.visit("/");
    const inputs = [
      "#attention_input",
      "#memory_input",
      "#fluency_input",
      "#language_input",
      "#visuospatial_input",
    ];
    inputs.forEach((input_id) => cy.get(input_id).type("10"));
    cy.get("#attention_input").should("have.value", "10");
    cy.get("button").contains("Reset").click();
    inputs.forEach((input_id) => cy.get(input_id).should("have.value", ""));
  });
});
