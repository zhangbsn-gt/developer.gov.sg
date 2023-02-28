/// <reference types="cypress" />

// Imports
import config from "../../support/config";
import {
  getEventsData,
  filterEventsByCategory,
  filterEventsIntoUpcomingAndPast,
  verifyEventCardChronologicalOrder,
} from "../../support/communities";

const { MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD } = config;
const verifyEventPlacementByTimingStatus = (upcomingEvents, elementId) => {
  cy.get(elementId).then($upcomingEventsContainer => {
    if ($upcomingEventsContainer.find("div").length > 0) {
      cy.get(elementId)
        .find("div[class='community-section-event-card']")
        .its("length")
        .should("eq", upcomingEvents.length);
    }
  });
};

describe("STACK Meetup Overview Page Test", function () {
  context("Mobile and Desktop Test Case", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
      // Wipe out state from the previous tests
      cy.visit("/communities/events/stack-meetups/");
    });

    it("Is the number of events on the STACK Meetup page equal to the number of stack-x events in the events data file", () => {
      // Get the events data from the response
      getEventsData().then(response => {
        // Filter the events data to get only the events that belongs to the STACK Meetup category
        const stackXEvents = filterEventsByCategory(
          response.body,
          "STACK Meetup"
        );

        // Verify that the page contains the same number of events as the filtered events data
        cy.get("div[class='community-section-event-card']").should(
          "have.length",
          stackXEvents.length
        );
      });
    });

    it("Is the events sorted correctly into the upcoming-events-container and past-events-container", () => {
      // Get the events data from the response
      getEventsData().then(response => {
        // Filter the events data to get only the events that belongs to the STACK Meetups category
        const stackXEvents = filterEventsByCategory(
          response.body,
          "STACK Meetup"
        );

        // Filter the events data to get events by timing status
        const [upcomingEvents, pastEvents] =
          filterEventsIntoUpcomingAndPast(stackXEvents);

        // Verify that the upcoming events are inserted into the upcoming events container
        verifyEventPlacementByTimingStatus(
          upcomingEvents,
          "#upcoming-events-container"
        );
        // Verify that the past events are inserted into the past events container
        verifyEventPlacementByTimingStatus(
          pastEvents,
          "#past-events-container"
        );
      });
    });

    it("Are the event icon rendering correspondingly to the Stack-X category", () => {
      // Get attribute, alt, of the event icon
      cy.get("img[data-cy='event-category-iconography']").each($eventCard => {
        // Verify that the event icon is rendered correctly
        expect($eventCard.parent().text().trim()).to.eq("STACK Meetup");
        // Expect the src of the event icon to be equal to the conference icon
        expect($eventCard.attr("src")).to.eq(
          "/assets/img/communities/stack-meetups.svg"
        );
      });
    });

    it("Is the number of visible event cards in the upcoming-events-container less than or equal to 2", () => {
      cy.get("#upcoming-events-container").then($upcomingEventsContainer => {
        if ($upcomingEventsContainer.find("div").length > 0) {
          cy.get("#upcoming-events-container")
            .find("div[class='community-section-event-card']:visible")
            .should("have.length.lte", MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD);
        }
      });
    });

    it("Is the number of visible event cards in the past-events-container less than or equal to 2", () => {
      // Get the past events container that goes by the id, past-events-container and get the number of visible events
      cy.get("#past-events-container").then($pastEventsContainer => {
        if ($pastEventsContainer.find("div").length > 0) {
          // Get the number of visible events in the past events container
          cy.get("#past-events-container")
            .find("div[class='community-section-event-card']:visible")
            .should("have.length.lte", MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD);
        }
      });
    });

    it("Is the 'recordings available' text rendered for past events that belongs to the key value pair of event_recording_link", () => {
      getEventsData().then(response => {
        // Filter the events data to get only the events that belongs to the STACK Meetup category
        const stackXEvents = filterEventsByCategory(
          response.body,
          "STACK Meetup"
        );

        // Filter the events data to get only the events that are upcoming
        const [upcomingEvents, pastEvents] =
          filterEventsIntoUpcomingAndPast(stackXEvents);

        // Filter the past events data to get only the events that has the key value pair of event_recording_link
        const pastEventsWithRecordings = pastEvents.filter(
          event => event.event_recording_link !== "false"
        );

        // Verify that the number of past events with recordings is equal to the number of past events with recordings rendered in the past events container
        cy.get("#past-events-container").then($pastEventsContainer => {
          if ($pastEventsContainer.find("div").length > 0) {
            cy.get("#past-events-container")
              .find("div[data-recording-available='true']")
              .its("length")
              .should("eq", pastEventsWithRecordings.length);
          }
        });
      });
    });

    it("Are the buttons and messages rendered appropriately for the number of events in the upcoming-events-container", () => {
      // Get the upcoming events container that goes by the id, upcoming-events-container and get the number of visible events
      cy.get("div[id='upcoming-events-container']").then(
        $upcomingEventsContainer => {
          const numberOfUpcomingEventsCards =
            $upcomingEventsContainer.children().length;

          cy.log("upcomingEventsContainer", numberOfUpcomingEventsCards);

          switch (true) {
            case numberOfUpcomingEventsCards === 0:
              cy.get("div[id='no-upcoming-events-message']").should(
                "be.visible"
              );
              break;
            case numberOfUpcomingEventsCards <=
              MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD:
              cy.get(
                "button[id='view-all-upcoming-stack-events-button']"
              ).should("not.exist");
              break;
            case numberOfUpcomingEventsCards >
              MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD:
              cy.get(
                "button[id='view-all-upcoming-stack-events-button']"
              ).should("be.visible");
              cy.get(
                "button[id='view-all-upcoming-stack-events-button']"
              ).click();
              cy.get("#upcoming-events-container")
                .find("div[class='community-section-event-card']")
                .its("length")
                .should("be.gte", 2);
              break;
          }
        }
      );
    });

    it("Are the buttons and messages rendered appropriately for the number of events in the past-events-container", () => {
      cy.get("div[id='past-events-container']").then($pastEventsContainer => {
        const numberOfPastEventsCards = $pastEventsContainer.children().length;

        switch (true) {
          case numberOfPastEventsCards === 0:
            cy.get("div[id='no-past-events-message']").should("be.visible");
            break;
          case numberOfPastEventsCards <= MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD:
            cy.get("button[id='view-all-past-stack-events-button']").should(
              "not.exist"
            );
            break;
          case numberOfPastEventsCards > MAX_NUMBER_OF_VISIBLE_EVENTS_ONLOAD:
            cy.get("button[id='view-all-past-stack-events-button']").should(
              "be.visible"
            );
            cy.get("button[id='view-all-past-stack-events-button']").click();
            cy.get("#past-events-container")
              .find("div")
              .its("length")
              .should("be.gte", 2);
            break;
        }
      });
    });

    it("Are the events in the upcoming-events-container in chronological order", () => {
      verifyEventCardChronologicalOrder(
        "#upcoming-events-container",
        "ascending"
      );
    });

    it("Are the events in the past-events-container in reversed chronological order", () => {
      verifyEventCardChronologicalOrder("#past-events-container", "descending");
    });
  });
});
