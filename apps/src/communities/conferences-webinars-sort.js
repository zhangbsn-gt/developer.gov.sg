import { getEventDataByDate } from "../lib/communities";

(() => {
  try {
    // Variables
    const limit_number_of_content = document
      .querySelector('script[data-id="conferences-webinars-sort"]')
      .getAttribute("data-content-limit");

    // Selectors
    const pastEventsContainer = document.getElementById(
      "past-events-container"
    );
    const upcomingEventsContainer = document.getElementById(
      "upcoming-events-container"
    );

    // Adding attributes to elements and dynamically changing the color of the content based on the date of the event and the current time
    document.querySelectorAll("[data-future-date]").forEach(node => {
      const eventDate = node.getAttribute("data-future-date");
      const { status, backgroundColor } = getEventDataByDate(eventDate, node);

      // Gets the mobile and desktop view
      for (var j = 0; j < node.querySelectorAll(".event-status").length; j++) {
        node.querySelectorAll(".event-status")[j].innerHTML =
          status.toUpperCase();
        node.querySelectorAll(".event-status-container")[
          j
        ].style.backgroundColor = backgroundColor;
      }
    });

    // Filter events by past and upcoming events into two separate arrays
    const pastEvents = Array.from(
      document.querySelectorAll("div[data-event-status='past-event']")
    ).map((item, index) => {
      if (limit_number_of_content > index) {
        pastEventsContainer.appendChild(item);
      } else {
        pastEventsContainer
          .appendChild(item)
          .setAttribute("content-visibility-toggle", "past-conferences");
      }
    });

    const upcomingEvents = Array.from(
      document.querySelectorAll("div[data-event-status='upcoming-event']")
    )
      .reverse()
      .map((item, index) => {
        if (limit_number_of_content > index) {
          upcomingEventsContainer.appendChild(item);
        } else {
          upcomingEventsContainer
            .appendChild(item)
            .setAttribute("content-visibility-toggle", "upcoming-conferences");
        }
      });

    if (pastEvents.length > 0)
      document.getElementById("no-past-events-message").remove();
    if (upcomingEvents.length > 0)
      document.getElementById("no-upcoming-events-message").remove();
    if (limit_number_of_content >= pastEvents.length)
      document.getElementById("past-conferences-button").remove();
    if (limit_number_of_content >= upcomingEvents.length)
      document.getElementById("upcoming-conferences-button").remove();
    document
      .querySelectorAll('*[content-visibility-toggle*="conferences"]')
      .forEach(item => {
        item.style.display = "none";
      });
  } catch (e) {
    console.log("Failure at", e);
  }
})();
