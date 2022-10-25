import {
  getEventStatusAndBackgroundColor,
  setEventStatusAndBackgroundColor,
} from "../lib/communities";

(() => {
  try {
    // Variables
    const { navLevel } = document.querySelector(
      'script[data-id="layout-page-sidenav-calendar"]'
    ).dataset;

    // Since the script is only run on the layout-page-sidenav-calendar page, we can assume that page.multi_level_layout is present
    if (navLevel) {
      // Selectors
      const sgdsCardEventInformation = document.querySelectorAll(
        ".sgds-card-event-information"
      );

      // 1. Set the event status and background color
      // 2. Programatically set the anchor tag, event-information-link to the event recording link if the event has ended
      [...sgdsCardEventInformation].map(function (el) {
        const {
          startDate,
          endDate,
          registrationEndDate,
          registrationLink,
          recordingLink,
        } = el.dataset;
        const eventInformationAnchorTag = el.querySelector(
          "#event-information-link"
        );
        const { status, backgroundColor } = getEventStatusAndBackgroundColor(
          startDate,
          endDate,
          el
        );

        // There are three cases:
        // 1. The event has not started yet
        // 2. The event is currently happening (Now)
        // 3. The event has ended
        setEventStatusAndBackgroundColor(el, status, backgroundColor);

        switch (true) {
          case status === "upcoming":
            eventInformationAnchorTag.href = registrationLink;
            eventInformationAnchorTag.textContent = "Register Now";
            eventInformationAnchorTag.style.backgroundColor = "#0161AF";
            break;
          case status === "past":
            if (recordingLink) {
              eventInformationAnchorTag.href = recordingLink;
              eventInformationAnchorTag.textContent = "View Recording";
              eventInformationAnchorTag.style.backgroundColor = "#0161AF";
              break;
            }

            // Disable the anchor tag
            eventInformationAnchorTag.textContent = "Pending upload";
            eventInformationAnchorTag.style.cursor = "not-allowed";
            eventInformationAnchorTag.style.pointerEvents = "none";
            eventInformationAnchorTag.style.backgroundColor = "#C6C6C6";
            break;
          case status === "now":
            // Compare the registration end date with the current date
            if (new Date() > new Date(registrationEndDate)) {
              eventInformationAnchorTag.textContent = "Registration Closed";
              eventInformationAnchorTag.style.backgroundColor = "#C6C6C6";
              eventInformationAnchorTag.style.cursor = "not-allowed";
              eventInformationAnchorTag.style.pointerEvents = "none";
              break;
            }

            eventInformationAnchorTag.href = registrationLink;
            eventInformationAnchorTag.textContent = "Register Now";
            eventInformationAnchorTag.style.backgroundColor = "#0161AF";
            break;
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
})();
