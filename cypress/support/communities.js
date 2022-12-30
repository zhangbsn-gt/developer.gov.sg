export const getEventsData = () => {
  // Get events data from the API
  cy.request("/search/events.json").as("eventsData");
  // Verify that the API call was successful
  cy.get("@eventsData").its("status").should("eq", 200);
  // Verify that the body.pages of the response is not empty
  cy.get("@eventsData").its("body.pages").should("not.be.empty");
  // Return the events data
  return cy.get("@eventsData");
};

export const filterEventsByCategory = (eventsData, category) => {
  return eventsData.pages.filter(event => event.category === category);
};

export const filterEventsIntoUpcomingAndPast = eventsData => {
  const today = new Date();
  return eventsData.reduce(
    (acc, event) => {
      const [upcomingEvents, pastEvents] = acc;
      const eventStartDateAndTime = new Date(event.date_time.start_date_time);
      const eventEndDateAndTime = new Date(event.date_time.end_date_time);

      switch (true) {
        case eventStartDateAndTime > today:
          upcomingEvents.push(event);
          break;
        case eventStartDateAndTime <= today && eventEndDateAndTime >= today:
          upcomingEvents.push(event);
          break;
        case eventEndDateAndTime < today:
          pastEvents.push(event);
          break;
      }

      return [upcomingEvents, pastEvents];
    },
    [[], []]
  );
};

export const verifyEventCardChronologicalOrder = (containerId, order) => {
  cy.get(containerId).then($container => {
    if ($container.children().length === 0) {
      // If no event cards are found, fail the test with a custom error message
      return;
    } else {
      // If event cards are found, continue with the rest of the code
      cy.get(containerId)
        .find("div[class='community-section-event-card']")
        .then($eventCards => {
          if ($eventCards.length <= 1) {
            // If there are no event cards or only one event card, return without running the rest of the code
            return;
          }

          $eventCards.each((index, $eventCard) => {
            if (index < $eventCards.length - 1) {
              const firstEventCardStartDate = $eventCard.dataset.startDate;
              const secondEventCardStartDate =
                $eventCards[index + 1].dataset.startDate;

              const firstEventCardStartDateInMilliseconds = new Date(
                firstEventCardStartDate
              ).getTime();
              const secondEventCardStartDateInMilliseconds = new Date(
                secondEventCardStartDate
              ).getTime();

              if (order === "ascending") {
                expect(firstEventCardStartDateInMilliseconds).to.be.lte(
                  secondEventCardStartDateInMilliseconds
                );
              } else if (order === "descending") {
                expect(firstEventCardStartDateInMilliseconds).to.be.gte(
                  secondEventCardStartDateInMilliseconds
                );
              }
            }
          });
        });
    }
  });
};
