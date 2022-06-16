/// <reference types="cypress" />
describe("Community Section Overview Page Test", function () {
  context("Desktop Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/communities");
    });

    beforeEach(() => {
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
      cy.get("#upcoming-events-container").then($body => {
        if ($body.find("div[data-future-date]:visible").length) {
          cy.get($body)
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.lte", 2);
        }
      });
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

    // Newsletter
    it("Should display the newsletter signup form when clicked on the 'Join our newsletter' button.", () => {
      // Reset
      cy.visit("/communities");

      cy.get("#tab1")
        .find("a[id='newsletter-signup-link']")
        .click({ force: true });

      // check if the url is correct
      cy.url().should(
        "include",
        "https://form.gov.sg/#!/620c7a0ba71f3d001367f9b5"
      );
    });

    it("Should display at least 3 newsletter.", () => {
      // Reset
      cy.visit("/communities");

      // Scroll into view
      cy.get(".sgds-tabs").scrollIntoView();
      // Get the tab container housing the cards
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card:visible")
        .its("length")
        .should("be.lte", 3);
    });

    it("Should redirect after after clicking on the “View All Newsletter” button.", () => {
      // Scroll into view
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card")
        .last()
        .scrollIntoView();

      // Click on the button and check for redirection status
      cy.get("#tab1")
        .find("div[id='view-all-newsletter-button']")
        .children()
        .click({ force: true });

      // Check if the url is corressponds corretly
      cy.url().should("include", "/communities/newsletter/");
    });

    // Developer blogs
    it("Should redirect after after clicking on the “View All Developer Blogs button.", () => {
      // Reset
      cy.visit("/communities");

      // Click on tab2 via the anchor tag via the attribute data-tab
      cy.get("li > a[data-tab='#tab2']").click();

      // Click on the button and check for redirection status
      cy.get("#tab2")
        .find("div[id='view-all-developer-blogs-link']")
        .children()
        .click();

      // Check if the url is corressponds corretly
      cy.url().should("include", "/communities/developer-blogs/");
    });
  });

  context("Mobile Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/");
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
      cy.get("#upcoming-events-container").then($body => {
        if ($body.find("div[data-future-date]:visible").length) {
          cy.get($body)
            .find("div[data-future-date]:visible")
            .its("length")
            .should("be.lte", 2);
        }
      });
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

    // Newsletter
    it("Should display the newsletter signup form when clicked on the 'Join our newsletter' button.", () => {
      // Reset
      cy.visit("/communities");

      cy.get("#tab1")
        .find("a[id='newsletter-signup-link']")
        .click({ force: true });

      // check if the url is correct
      cy.url().should(
        "include",
        "https://form.gov.sg/#!/620c7a0ba71f3d001367f9b5"
      );
    });

    it("Should display at least 3 newsletter.", () => {
      // Reset
      cy.visit("/communities");

      // Scroll into view
      cy.get(".sgds-tabs").scrollIntoView();
      // Get the tab container housing the cards
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card:visible")
        .its("length")
        .should("be.lte", 3);
    });

    it("Should redirect after after clicking on the “View All Newsletter” button.", () => {
      // Scroll into view
      cy.get("#tab1")
        .find(".card-grid-container")
        .find(".newsletter-card")
        .last()
        .scrollIntoView();

      // Click on the button and check for redirection status
      cy.get("#tab1")
        .find("div[id='view-all-newsletter-button']")
        .children()
        .click({ force: true });

      // Check if the url is corressponds corretly
      cy.url().should("include", "/communities/newsletter/");
    });

    // Developer blogs
    it("Should redirect after after clicking on the “View All Developer Blogs button.", () => {
      // Reset
      cy.visit("/communities");

      // Click on tab2 via the anchor tag via the attribute data-tab
      cy.get("li > a[data-tab='#tab2']").click();

      // Click on the button and check for redirection status
      cy.get("#tab2")
        .find("div[id='view-all-developer-blogs-link']")
        .children()
        .click();

      // Check if the url is corressponds corretly
      cy.url().should("include", "/communities/developer-blogs/");
    });
  });
});
