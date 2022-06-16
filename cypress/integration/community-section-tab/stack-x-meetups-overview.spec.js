/// <reference types="cypress" />

describe("Stack X Overview Page Test", function () {
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

    it("Should be able to navigate to the Stack-X Meetups overview page from the community Section Index page.", () => {
      // COMMUNITIES OVERVIEW SIDENAV
      cy.get(".sgds-menu")
        .find(".sgds-menu-list")
        .find(".second-level-nav")
        .contains("Events")
        .click({
          force: true,
        });

      cy.get(".sgds-card", { timeout: 5000 })
        .find("a")
        .contains("STACK-X Meetups")
        .click({ force: true });

      cy.url().should("include", "/communities/events/stack-x-meetups/");
    });

    it("Should only be able to get events that belongs to the Stack-X Meetups category", () => {
      cy.get("img[alt='Event Icon']", { timeout: 5000 }).each($el => {
        expect($el.parent().text().trim()).to.eq("Stack-x meetup");
      });
    });

    it("Should only display less or equal to 2 content for All Upcoming Stack-X Meetups", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2
      cy.get("#upcoming-events-container").then($body => {
        if ($body.find("div[data-future-date]:visible").length) {
          cy.get($body)
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.lte", 2);
        }
      });
    });

    it("Should only display less or equal to 2 content for Recent Past STACK-X Meetups", () => {
      // Get the All past stack-x meetups container that goes by the id, upcoming-events-container
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2
      cy.get("#past-events-container")
        .find("div[data-future-date]:visible")
        .its("length")
        .should("be.lte", 2);
    });

    it("Should be able to click on the View all events button that will lead to more content provided if theres more than 2 events (upcoming events)", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container.
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2.
      // Next, if its more than 2, click on the View all events button
      cy.get("#upcoming-events-container").then($body => {
        // if no events, then check if the no message text is displayed
        if ($body.find("div[data-future-date]").length == 0) {
          cy.get("div[id='no-upcoming-events-message']").should("be.visible");
        }

        // if theere is only less than 2 events, then check if there is no view all events button
        if ($body.find("div[data-future-date]").length <= 2) {
          cy.get('div[id="upcoming-conferences-button"]').should("not.exist");
        }

        // if the number of cards is greater than 2, then click on the View all events button
        if ($body.find("div[data-future-date]").length > 2) {
          cy.get('div[id="upcoming-conferences-button"]')
            .children()
            .click()
            .get("#past-events-container")
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.gte", 2);
        }
      });
    });

    it("Should be able to click on the View all events button that will lead to more content provided if theres more than 2 events (past events)", () => {
      // Get the All past stack-x meetups container that goes by the id, upcoming-events-container.
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2.
      // Next, if its more than 2, click on the View all events button
      cy.get("#past-events-container").then($body => {
        // if no events, then check if the no message text is displayed
        if ($body.find("div[data-future-date]").length == 0) {
          cy.get("div[id='no-past-events-message']").should("be.visible");
        }

        // if there is only less than 2 events, then check if there is no view all events button
        if ($body.find("div[data-future-date]").length <= 2) {
          cy.get('div[id="past-conferences-button"]').should("not.exist");
        }

        // if the number of cards is greater than 2, then click on the View all events button
        if ($body.find("div[data-future-date]").length > 2) {
          cy.get('div[id="past-conferences-button"]')
            .children()
            .click()
            .get("#past-events-container")
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.gte", 2);
        }
      });
    });
  });

  context("Mobile Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/");
      // Communities overview page
      cy.contains("Communities").click({ force: true });
      cy.url().should("include", "/communities");
    });

    beforeEach(() => {
      cy.viewport("iphone-xr");
    });

    it("Should be able to navigate to the Stack-X Meetups overview page from the community Section Index page.", () => {
      // COMMUNITIES OVERVIEW SIDENAV
      cy.get(".mobile-sidenav-toggle").contains("Communities").click();

      // SIDENAV OVERLAY
      cy.contains("Events").click({ force: true });

      cy.get(".sgds-card", { timeout: 5000 })
        .find("a")
        .contains("STACK-X Meetups")
        .click({ force: true });

      cy.url().should("include", "/communities/events/stack-x-meetups/");
    });

    it("Should only be able to get events that belongs to the Stack-X Meetups category", () => {
      cy.get("img[alt='Event Icon']", { timeout: 5000 }).each($el => {
        expect($el.parent().text().trim()).to.eq("Stack-x meetup");
      });
    });

    it("Should only display less or equal to 2 content for All Upcoming Stack-X Meetups", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2
      cy.get("#upcoming-events-container").then($body => {
        if ($body.find("div[data-future-date]:visible").length) {
          cy.get($body)
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.lte", 2);
        }
      });
    });

    it("Should only display less or equal to 2 content for Recent Past STACK-X Meetups", () => {
      // Get the All past stack-x meetups container that goes by the id, upcoming-events-container
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2
      cy.get("#past-events-container")
        .find("div[data-future-date]:visible")
        .its("length")
        .should("be.lte", 2);
    });

    it("Should be able to click on the View all events button that will lead to more content provided if theres more than 2 events (upcoming events)", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container.
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2.
      // Next, if its more than 2, click on the View all events button
      cy.get("#upcoming-events-container").then($body => {
        // if no events, then check if the no message text is displayed
        if ($body.find("div[data-future-date]").length == 0) {
          cy.get("div[id='no-upcoming-events-message']").should("be.visible");
        }

        // if theere is only less than 2 events, then check if there is no view all events button
        if ($body.find("div[data-future-date]").length <= 2) {
          cy.get('div[id="upcoming-conferences-button"]').should("not.exist");
        }

        // if the number of cards is greater than 2, then click on the View all events button
        if ($body.find("div[data-future-date]").length > 2) {
          cy.get('div[id="upcoming-conferences-button"]')
            .children()
            .click()
            .get("#past-events-container")
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.gte", 2);
        }
      });
    });

    it("Should be able to click on the View all events button that will lead to more content provided if theres more than 2 events (past events)", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container.
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2.
      // Next, if its more than 2, click on the View all events button
      cy.get("#past-events-container").then($body => {
        // if no events, then check if the no message text is displayed
        if ($body.find("div[data-future-date]").length == 0) {
          cy.get("div[id='no-past-events-message']").should("be.visible");
        }

        // if there is only less than 2 events, then check if there is no view all events button
        if ($body.find("div[data-future-date]").length <= 2) {
          cy.get('div[id="past-conferences-button"]').should("not.exist");
        }

        // if the number of cards is greater than 2, then click on the View all events button
        if ($body.find("div[data-future-date]").length > 2) {
          cy.get('div[id="past-conferences-button"]')
            .children()
            .click()
            .get("#past-events-container")
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.gte", 2);
        }
      });
    });
  });
});
