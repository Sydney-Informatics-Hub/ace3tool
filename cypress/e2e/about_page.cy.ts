describe("About page", () => {
  it("Shows About content", () => {
    cy.visit("/about");
    cy.get("h2").should(
      "contain",
      "Welcome to the Addenbrooke’s Cognitive Examination-III (ACE-III) Online Dementia Screening Tool"
    );
  });

  it("Shows content from markdown", () => {
    cy.visit("/about");
    cy.get("p").should(
      "contain",
      "This tool, developed by the FRONTIER Research Group at the\n" +
        "University of Sydney, is designed to assist clinicians in\n" +
        "screening patients for dementia."
    );
  });
});
