import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

When("I visit {string}", (route) => {
  cy.visit(`http://localhost:3000${route}`);
});

When("I enter {string} into {string}", (value: string, inputName) => {
  cy.get(`input[name="${inputName}"]`).type(value);
});

When("I enter random email into {string}", (inputName) => {
  const randomEmail = faker.internet.email(
    "Common",
    "Tests",
    "test.commonplace.dev"
  );
  cy.get(`input[name="${inputName}"]`).type(randomEmail);
});

When("I click {string} button", (buttonText: string) => {
  cy.get(`input[type="submit"][value="${buttonText}"]`).click();
});

Then("I should be on {string}", (route) => {
  cy.url().should("contain", route);
});

Then("I should see user content", () => {});

Then("I should see related information", () => {});

Then("I should see new user content", () => {});

Then("I should see new related information", () => {});

Then("I should see {string} in credit indicator", () => {});

When("I select {string} impression", () => {});

When("I wait {number} seconds", () => {});
