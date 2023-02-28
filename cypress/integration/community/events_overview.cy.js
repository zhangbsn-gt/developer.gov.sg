describe("Events Page Test", function () {
  context("Mobile and Desktop Test Case", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
      // Wipe out state from the previous tests
      cy.visit("/communities/events");
    });

    it("should have the correct title", () => {
      cy.title().should("eq", "Events | Singapore Government Developer Portal");
    });

    it("should have the correct header", () => {
      cy.get("h1").should("have.text", "Events");
    });

    it("should have the correct description", () => {
      cy.get("p").contains(
        "Join the tech community in a variety of events aimed at building stronger community connections, peer-to-peer learning, sharing of thought leadership from industry experts and the provision of industry updates. Our events are suited for individuals of all ages!"
      );
    });

    // Instead of repeating the same logic for each of the links,
    // we can define a helper function that we can use to test
    // the links to the "Conferences" and "STACK Meetups" pages
    const testLink = (linkSelector, pageUrl, title) => {
      it(`should have a link to the '${title}' page`, () => {
        cy.get(".sgds-card")
          .find(linkSelector)
          .should("be.visible")
          .contains(title);
      });

      it(`should navigate to the '${pageUrl}' page on click`, () => {
        cy.log(`Clicking on the anchor tag to the ${pageUrl} page`);
        cy.get(linkSelector).click();

        cy.log(`Verify that the ${pageUrl} page is loaded`);
        cy.url().should("contains", pageUrl);
      });
    };

    // Use the helper function to test the links to the "Conferences" and "STACK Meetups" pages
    testLink(
      "a[href='/communities/events/conferences/']",
      "/communities/events/conferences/",
      "Conferences"
    );
    testLink(
      "a[href='/communities/events/stack-meetups/']",
      "/communities/events/stack-meetups/",
      "STACK Meetups"
    );
  });
});
