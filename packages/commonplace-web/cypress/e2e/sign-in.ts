import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit {string}", (route) => {
  cy.visit(`http://localhost:3000${route}`);
});

Then("I should see an input named {string}", (inputName) => {
  cy.get(`input[name="${inputName}"]`);
});

When("I enter {string} into {string}", (value: string, inputName) => {
  cy.get(`input[name="${inputName}"]`).type(value);
});

When("I click {string} button", (buttonText: string) => {
  cy.get(`input[type="submit"][value="${buttonText}"]`).click();
});

Then("I should be on {string}", (route) => {
  cy.url().should("contain", route);
});

Then("I should see an error containing {string}", (message: string) => {
  cy.get(`section.formMessage span.messageContent`).contains(message);
});
