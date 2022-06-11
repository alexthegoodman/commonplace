describe("group 1", () => {
  it("test 1", () => {
    cy.visit("https://www.duckduckgo.com");

    cy.get("input").should(
      "have.attr",
      "placeholder",
      "Search the web without being tracked"
    );
  });
});
