import { getCompareDate, getEventDataByDate } from "../lib/communities";

(() => {
  // Variables
  const scriptElement = document.querySelector(
    'script[data-id="layout-page-sidenav-calendar"]'
  );

  const {
    navLevel,
    eventRecordingLink,
    eventRegistrationEndDate,
  } = scriptElement.dataset;

  // Since the script is only run on the layout-page-sidenav-calendar page, we can assume that page.multi_level_layout is present
  if (navLevel) {
    document.querySelectorAll("[data-future-date]").forEach((node) => {
      const eventDate = node.getAttribute("data-future-date");
      const eventButton = node.querySelector("#dynamic-event-button");
      const { status, backgroundColor } = getEventDataByDate(eventDate, node);

      switch (true) {
        case status === "past":
          if (eventRecordingLink) {
            eventButton.innerHTML = "View recordings";
            eventButton.style.backgroundColor = "#0161AF";
            break;
          }

          eventButton.disabled = true;
          eventButton.innerHTML = "Pending upload";
          eventButton.style.backgroundColor = "#C6C6C6";
          break;
        case status === "upcoming":
          eventButton.style.color = "white";
          eventButton.innerHTML = "Register Interest";
          eventButton.style.backgroundColor = "#0161AF";
          break;
        default:
          // if todays date is greater than the end date of the registration date, then the registration is closed
          if (getCompareDate() > eventRegistrationEndDate) {
            eventButton.disabled = true;
            eventButton.innerHTML = "Registration closed";
            eventButton.style.backgroundColor = "#c6c6c6";
            break;
          }

          eventButton.disabled = false;
          eventButton.innerHTML = "Register Interest";
          eventButton.style.backgroundColor = "#0161AF";
          break;
      }

      for (var j = 0; j < node.querySelectorAll(".event-status").length; j++) {
        node.querySelectorAll(".event-status")[
          j
        ].innerHTML = status.toUpperCase();
        node.querySelectorAll(".event-status-container")[
          j
        ].style.backgroundColor = backgroundColor;
      }
    });
  }
})();
