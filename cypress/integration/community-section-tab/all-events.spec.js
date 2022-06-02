/// <reference types="cypress" />
const yaml = require("js-yaml");

describe("All Events Page Test", function () {
  context("Desktop Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/communities");
      // Communities overview page
      cy.contains("Communities").click({ force: true });
      cy.url().should("include", "/communities");
    });

    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("Should be able to navigate to the search events page from the community tab index page, “View all events” button", () => {
      cy.get("a[href='/communities/events/all-events/index.html']").click({
        force: true,
      });

      cy.url().should("include", "/communities/events/all-events/");
    });

    it("Should be able to navigate to the search events page from the community tab sidebar", () => {
      // RESET
      cy.visit("/communities");

      // COMMUNITIES OVERVIEW SIDENAV
      cy.get(".sgds-menu")
        .find(".sgds-menu-list")
        .find(".second-level-nav")
        .contains("Events")
        .click({
          force: true,
        });

      // EVENTS OVERVIEW
      cy.get("a[href='/communities/events/all-events/']").click({
        force: true,
      });

      cy.url().should("include", "/communities/events/all-events/");
    });

    it("Should have the right number of search results popping up - i.e. same as the events-nav.yml file", () => {
      // RESET
      cy.visit("/communities/events/all-events/");

      cy.readFile("_data/events-nav.yml", "utf8").then(str => {
        // parse the string into object literal

        const content = yaml.load(str);
        const lengthOfEntireFile = content.length;

        cy.get(".card-grid-container")
          .find(".sgds-card-list")
          .should("have.length", lengthOfEntireFile);
      });
    });

    it("Should have the right category of search results after filtering for only the stack-x category", () => {
      cy.visit("/communities/events/all-events/");
      cy.get("#query-all-category").select("Stack-x Meetup");

      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .find('img[alt="Event Image"]')
        .each($el => {
          expect($el.next().text()).to.eq("Stack-X Meetup");
        });
    });

    it("Should have the right category of search results after filtering for only the conferences category", () => {
      cy.get("#query-all-category").select("Conference");
      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .find('img[alt="Event Image"]')
        .each($el => {
          expect($el.next().text()).to.eq("Conference");
        });
    });

    it("Should be able to pass in multiple filters, cloud (free text), stack-x meetup (select), 2021 (select), and state should be persistent.", () => {
      // Filters
      cy.get("#query-all-events").clear();
      cy.get("#query-all-events").type("cloud");
      cy.get("#query-all-category").select("Stack-x Meetup");
      cy.get("#query-all-year").select("2021");

      // Gets all the cards that are generated
      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .its("length")
        .should("be.gte", 1);
    });

    it("Should be able to pass in multiple filters, stack (free text), conferences (select), 2021 (select), and state should be persistent.", () => {
      // Filters
      cy.get("#query-all-events").clear();
      cy.get("#query-all-events").type("stack");
      cy.get("#query-all-category").select("Conference");
      cy.get("#query-all-year").select("2021");

      // Gets all the cards that are generated
      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .its("length")
        .should("be.gte", 1);
    });

    it("Should be able to navigate back to the events overview page after clicking the 'back to Events overview page' anchor tag", () => {
      cy.get("a[href='/communities']")
        .contains("Back to Events Overview")
        .scrollIntoView()
        .click({
          force: true,
        });

      cy.url().should("include", "/communities");
    });
  });

  context("Mobile Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/communities");
      // Communities overview page
      cy.contains("Communities").click({ force: true });
      cy.url().should("include", "/communities");
    });

    beforeEach(() => {
      cy.viewport("iphone-xr");
    });

    it("Should be able to navigate to the search events page from the community tab index page, “View all events” button", () => {
      cy.contains("Upcoming Events").scrollIntoView();

      cy.get("a[href='/communities/events/all-events/index.html']")
        .contains("View all events")
        .click({
          force: true,
        });

      cy.url().should("include", "/communities/events/all-events/");
    });

    it("Should be able to navigate to the search events page from the community tab sidebar", () => {
      cy.visit("/communities");

      // COMMUNITIES OVERVIEW SIDENAV
      cy.get(".mobile-sidenav-toggle").contains("Communities").click();
      // SIDENAV OVERLAY
      cy.contains("Events").click({ force: true });

      cy.get("a[href='/communities/events/all-events/']").scrollIntoView();

      // EVENTS OVERVIEW
      cy.get("a[href='/communities/events/all-events/']").click({
        force: true,
      });

      cy.url().should("include", "/communities/events/all-events/");
    });

    it("Should have the right number of search results popping up - i.e. same as the events-nav.yml file", () => {
      // RESET
      cy.visit("/communities/events/all-events/");

      cy.readFile("_data/events-nav.yml", "utf8").then(str => {
        // parse the string into object literal
        const content = yaml.load(str);
        const lengthOfEntireFile = content.length;

        cy.get(".card-grid-container")
          .find(".sgds-card-list")
          .should("have.length", lengthOfEntireFile);
      });
    });

    it("Should have the right category of search results after filtering for only the stack-x category", () => {
      cy.visit("/communities/events/all-events/", { timeout: 5000 });
      cy.get("#query-all-category").select("Stack-x Meetup");

      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .find('img[alt="Event Image"]')
        .each($el => {
          expect($el.next().text()).to.eq("Stack-X Meetup");
        });
    });

    it("Should have the right category of search results after filtering for only the conferences category", () => {
      cy.get("#query-all-category").select("Conference");
      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .find('img[alt="Event Image"]')
        .each($el => {
          expect($el.next().text()).to.eq("Conference");
        });
    });

    it("Should be able to pass in multiple filters, cloud (free text), stack-x meetup (select), 2021 (select), and state should be persistent.", () => {
      // Filters
      cy.get("#query-all-events").clear();
      cy.get("#query-all-events").type("cloud");
      cy.get("#query-all-category").select("Stack-x Meetup");
      cy.get("#query-all-year").select("2021");

      // Gets all the cards that are generated
      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .its("length")
        .should("be.gte", 1);
    });

    it("Should be able to pass in multiple filters, stack (free text), conferences (select), 2021 (select), and state should be persistent.", () => {
      // Filters
      cy.get("#query-all-events").clear();
      cy.get("#query-all-events").type("stack");
      cy.get("#query-all-category").select("Conference");
      cy.get("#query-all-year").select("2021");

      // Gets all the cards that are generated
      cy.get(".card-grid-container")
        .find(".sgds-card-list")
        .its("length")
        .should("be.gte", 1);
    });

    it("Should be able to navigate back to the events overview page after clicking the 'back to Events overview page' anchor tag", () => {
      cy.get("a[href='/communities']")
        .contains("Back to Events Overview")
        .scrollIntoView()
        .click({
          force: true,
        });

      cy.url().should("include", "/communities");
    });
  });
});
