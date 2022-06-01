import { getEventDataByDate } from "../lib/communities";

(() => {
  // Variables
  const limit_number_of_content = document
    .querySelector('script[data-id="community-overview"]')
    .getAttribute("data-content-limit");

  // Selectors
  const upcomingEventsContainer = document.getElementById(
    "upcoming-events-container"
  );
  
  // Adding attributes to elements and dynamically changing the color of the content based on the date of the event and the current time
  document.querySelectorAll("[data-future-date]").forEach((node) => {
    const eventDate = node.getAttribute("data-future-date");
    const { status, backgroundColor } = getEventDataByDate(eventDate, node);

    // Gets the mobile and desktop view
    for (var j = 0; j < node.querySelectorAll(".event-status").length; j++) {
      node.querySelectorAll(".event-status")[
        j
      ].innerHTML = status.toUpperCase();
      node.querySelectorAll(".event-status-container")[
        j
      ].style.backgroundColor = backgroundColor;
    }
  });

  // Filter events by past and upcoming events into two separate arrays
  Array.from(
    document.querySelectorAll("div[data-event-status='past-event']")
  ).map((item, index) => {
    item.remove();
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

  if (upcomingEvents.length > 0)
    document.getElementById("no-upcoming-events-message").remove();
  document
    .querySelectorAll('*[content-visibility-toggle*="conferences"]')
    .forEach((item) => {
      item.style.display = "none";
    });
})();
