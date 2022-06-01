/// <reference types="cypress" />
describe("Community Section Overview Page Test", function() {
  context("Desktop Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("http://localhost:4000/");
      // Click on the community tab anchor tag
      cy.contains("Communities").click({ force: true });
      // Check whether it's the community tab by checking the url
      cy.url().should("include", "/communities");
    });

    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport("macbook-13");
    });

    it("Should display the message, 'Sorry, there is currently no upcoming available events.' when there are no upcoming events.", () => {
      cy.get("#upcoming-events-container").then($body => {
        // if no events, then check if the no message text is displayed
        if ($body.find("div[data-future-date]").length == 0) {
          cy.get("div[id='no-upcoming-events-message']").should("be.visible");
        }
      });
    });

    it("Should only display less than or equal to 2 content for all upcoming events.", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2
      cy.get("#upcoming-events-container")
        .find("div[data-future-date]:visible")
        .its("length")
        .should("be.lte", 2);
    });

    it("Should display the 'View all events' button even if there is no upcoming events.", () => {
      cy.contains("Upcoming Events").scrollIntoView();

      cy.get("#upcoming-conferences-button")
        .contains("View all events")
        .should("be.visible");
    });

    it("Should navigate all events seach page after clicking on the 'View all events' button.", () => {
      cy.get("#upcoming-conferences-button")
        .contains("View all events")
        .click();

      cy.url().should("include", "/communities/events/all-events/");
    });

    it("Should display at least 3 newsletter.", () => {
      // Reset
      cy.visit("http://localhost:4000/communities");

      // Scroll into view
      cy.get(".sgds-tabs").scrollIntoView();
      // Get the tab container housing the cards
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card:visible")
        .its("length")
        .should("be.lte", 3);
    });

    it("Should be able to click on the “View All Newsletter” that will display more information. Should be greater than the initial number.", () => {
      // Click on the view more content
      cy.get("#newsletter-display-more")
        .scrollIntoView()
        .click();
      // Check if the last element is exactly 'Ensuring Secure Migration of Data to the Cloud'
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card:visible")
        .its("length")
        .should("be.gt", 3);
    });

    it("Should hide the button after clicking on the “View All Newsletter” button.", () => {
      // Scroll into view
      cy.get("#tab1")
        .get(".card-grid-container")
        .get(".newsletter-card")
        .last()
        .scrollIntoView();

      // Check whether the "VView all newsletters" button is gone."
      cy.get("#tab1")
        .not(".newsletter-card")
        .should("not.contain", "View all newsletters");
    });
  });

  context("Mobile Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("http://localhost:4000/");
      // Click on the community tab anchor tag
      cy.contains("Communities").click({ force: true });
      // Check whether it's the community tab by checking the url
      cy.url().should("include", "/communities");
    });

    beforeEach(() => {
      cy.clearLocalStorage();
      cy.viewport("iphone-xr");
    });

    it("Should display the message, 'Sorry, there is currently no upcoming available events.' when there are no upcoming events", () => {
      cy.get("#upcoming-events-container").then($body => {
        // if no events, then check if the no message text is displayed
        if ($body.find("div[data-future-date]").length == 0) {
          cy.get("div[id='no-upcoming-events-message']").should("be.visible");
        }
      });
    });

    it("Should only display less than or equal to 2 content for all upcoming events.", () => {
      // Get the All upcoming stack-x meetups container that goes by the id, upcoming-events-container
      // Afterwards, get all the cards and ensure that number of cards is less than or equal to 2
      cy.get("#upcoming-events-container")
        .find("div[data-future-date]:visible")
        .its("length")
        .should("be.lte", 2);
    });

    it("Should display the 'View all events' button even if there is no upcoming events.", () => {
      cy.contains("Upcoming Events").scrollIntoView();

      cy.get("#upcoming-conferences-button")
        .contains("View all events")
        .should("be.visible");
    });

    it("Should navigate all events seach page after clicking on the 'View all events' button", () => {
      cy.get("#upcoming-conferences-button")
        .contains("View all events")
        .click();

      cy.url().should("include", "/communities/events/all-events/");
    });

    it("Should display at least 3 newsletter.", () => {
      // Reset
      cy.visit("http://localhost:4000/communities");

      // Scroll into view
      cy.get(".sgds-tabs").scrollIntoView();
      // Get the tab container housing the cards
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card:visible")
        .its("length")
        .should("be.lte", 3);
    });

    it("Should be able to click on the “View All Newsletter” that will display more information. Should be greater than the initial number.", () => {
      // Click on the view more content
      cy.get("#newsletter-display-more")
        .scrollIntoView()
        .click();

      // Check if the last element is exactly 'Ensuring Secure Migration of Data to the Cloud'
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card:visible")
        .its("length")
        .should("be.gt", 3);
    });

    it("Should hide the button after clicking on the “View All Newsletter” button", () => {
      // Scroll into view
      cy.get("#tab1")
        .get(".card-grid-container")
        .get(".newsletter-card")
        .last()
        .scrollIntoView();

      // Check whether the "VView all newsletters" button is gone."
      cy.get("#tab1")
        .not(".newsletter-card")
        .should("not.contain", "View all newsletters");
    });
  });
});
