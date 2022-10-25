export function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export function getEventStatusAndBackgroundColor(startDate, endDate, element) {
  const currentDate = new Date();
  const eventEndDateAndTime = new Date(endDate);
  const eventStartDateAndTime = new Date(startDate);

  switch (true) {
    case eventStartDateAndTime > currentDate:
      if (element) element.setAttribute("data-event-status", "upcoming-event");
      return { status: "upcoming", backgroundColor: "#0161AF" };

    case eventStartDateAndTime <= currentDate &&
      eventEndDateAndTime >= currentDate:
      if (element) element.setAttribute("data-event-status", "upcoming-event");
      return { status: "now", backgroundColor: "#D0021B" };

    case currentDate > eventEndDateAndTime:
      if (element) element.setAttribute("data-event-status", "past-event");
      return { status: "past", backgroundColor: "#323232" };
  }
}

export function setEventStatusAndBackgroundColor(
  element,
  status,
  backgroundColor
) {
  [...element.querySelectorAll(".event-status")].forEach(item => {
    item.textContent = status.toUpperCase();
  });
  [...element.querySelectorAll(".event-status-container")].forEach(item => {
    item.style.backgroundColor = backgroundColor;
  });
}
