// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./config";
import "./commands";

// After i imported config.js, what do i do with it copilot?
// For exampl,e i want to use the config max number of visible events onload value in my test
// How do i do that?
// You can use it like this:
// cy.get("div").should("have.length", Cypress.config("maxVisibleEventsOnLoad"));

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
