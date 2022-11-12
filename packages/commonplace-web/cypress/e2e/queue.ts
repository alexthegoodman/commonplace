import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

When("I visit {string}", (route) => {
  cy.visit(`http://localhost:3000${route}`);
});

When("I enter {string} into {string}", (value: string, inputName) => {
  cy.get(`input[name="${inputName}"]`).type(value);
});

When("I enter random email into {string}", (inputName) => {
  const randomEmail = faker.internet.email(
    "Common",
    nanoid(),
    "test.commonplace.dev"
  );
  cy.get(`input[name="${inputName}"]`).type(randomEmail);
});

When("I click {string} button", (buttonText: string) => {
  // cy.get(`input[type="submit"][value="${buttonText}"]`).click();
  cy.get(`button`).contains(buttonText).click();
});

Then("I should be on {string}", (route) => {
  cy.url().should("contain", route);
});

let previousContentSource = "";

Then("I should see user content", () => {
  cy.get("section.contentViewer div.contentViewerInner")
    .first()
    .should("contain.html", "img");

  previousContentSource = cy
    .$$("section.contentViewer div.contentViewerInner img")
    .attr("src") as string;
});

let previousContentTitle = "";

Then("I should see related information", () => {
  cy.get(".contentTitle").should("not.be.empty");
  cy.get(".authorProfileImage img").should("have.attr", "src");
  cy.get(".authorAttribution").should("not.be.empty");
  cy.get(".authorCreationCount").should("not.be.empty");
  cy.get(".contentDescription").should("not.be.empty");

  previousContentTitle = cy.$$(".contentTitle").html();
});

Then("I should see new user content", () => {
  const currentContentSource = cy
    .$$("section.contentViewer div.contentViewerInner img")
    .attr("src");

  expect(currentContentSource).to.not.equal(previousContentSource);
});

Then("I should see new related information", () => {
  cy.get(".contentTitle").should("not.equal", previousContentTitle);
});

Then("I should see {string} in credit indicator", (counterValue) => {
  cy.get(".creditCounter span").should("have.text", counterValue);
});

Then("I should see an input named {string}", (inputName) => {
  cy.get(`input[name="${inputName}"]`);
});

When("I select {string} Impression", (impressionName: string) => {
  cy.get(".impressionGrid .pillGrid").contains(impressionName).click();
});

When("I wait {int} seconds", (waitTime: number) => {
  cy.wait(waitTime * 1000);
});
