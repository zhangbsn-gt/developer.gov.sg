import {
  getEventStatusAndBackgroundColor,
  setEventStatusAndBackgroundColor,
} from "../lib/communities";

(() => {
  try {
    // Variables
    const pastEvents = [];
    const upcomingEvents = [];
    const { contentLimit, displayUpcoming, displayPast } =
      document.querySelector('script[data-id="community-overview"]').dataset;

    // Selectors
    const pastEventsContainer = document.getElementById(
      "past-events-container"
    );
    const upcomingEventsContainer = document.getElementById(
      "upcoming-events-container"
    );
    const eventCards = document.querySelectorAll(
      ".community-section-event-card"
    );

    // Filter events by past and upcoming events into two separate arrays and set the event status and background color
    [...eventCards].map(function (el) {
      const today = new Date();
      const eventEndDateAndTime = new Date(el.dataset.endDate);
      const eventStartDateAndTime = new Date(el.dataset.startDate);
      const { status, backgroundColor } = getEventStatusAndBackgroundColor(
        el.dataset.startDate,
        el.dataset.endDate,
        el
      );

      // There are three cases:
      // 1. The event has not started yet
      // 2. The event is currently happening (Now)
      // 3. The event has ended
      setEventStatusAndBackgroundColor(el, status, backgroundColor);
      switch (true) {
        case eventStartDateAndTime > today:
          upcomingEvents.push(el);
          break;
        case eventStartDateAndTime <= today && eventEndDateAndTime >= today:
          upcomingEvents.push(el);
          break;
        case eventEndDateAndTime < today:
          pastEvents.push(el);
          break;
      }
    });

    // Display the upcoming events
    if (displayUpcoming === "true") {
      // Append the upcoming events to the upcoming events container
      upcomingEvents
        .sort((a, b) => {
          const aDate = new Date(a.dataset.startDate);
          const bDate = new Date(b.dataset.startDate);
          return aDate - bDate;
        })
        .forEach((item, index) => {
          if (index >= contentLimit) {
            item.setAttribute("content-visibility-toggle", "upcoming-event");
            item.style.display = "none";
          }

          upcomingEventsContainer.appendChild(item);
        });

      // Upcoming event statuses
      if (
        upcomingEvents.length > 0 &&
        document.getElementById("no-upcoming-events-message")
      )
        document.getElementById("no-upcoming-events-message").remove();
      // Destroy the button with the id 'upcoming-events-view-more-button' if there are no more upcoming events to show
      if (
        contentLimit >= upcomingEvents.length &&
        document.getElementById("upcoming-events-view-more-button")
      )
        document.getElementById("upcoming-events-view-more-button").remove();
    } else {
      // Remove any events with the attribute of data-event-status="upcoming-event"
      [...eventCards].map(function (item) {
        if (item.dataset.eventStatus === "upcoming-event") item.remove();
      });
    }

    // Append the past events to the past events container
    if (displayPast === "true") {
      pastEvents
        .sort((a, b) => {
          const aDate = new Date(a.dataset.startDate);
          const bDate = new Date(b.dataset.startDate);
          return bDate - aDate;
        })
        .forEach((item, index) => {
          if (index >= contentLimit) {
            item.setAttribute("content-visibility-toggle", "past-event");
            item.style.display = "none";
          }

          pastEventsContainer.appendChild(item);
        });

      // Past event statuses
      if (
        pastEvents.length > 0 &&
        document.getElementById("no-past-events-message")
      )
        document.getElementById("no-past-events-message").remove();
      if (
        contentLimit >= pastEvents.length &&
        document.getElementById("past-events-view-more-button")
      )
        document.getElementById("past-events-view-more-button").remove();
    } else {
      // Remove any events with the attribute of data-event-status="past-event"
      [...eventCards].map(function (item) {
        if (item.dataset.eventStatus === "past-event") item.remove();
      });
    }
  } catch (e) {
    console.error(e);
  }
})();
