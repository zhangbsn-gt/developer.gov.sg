export function getCompareDate() {
  // gets local time, sg / kl timing
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("");
}

export function getEventDataByDate(event_date, element) {
  switch (true) {
    case event_date < getCompareDate():
      if (element) element.setAttribute("data-event-status", "past-event");
      return { status: "past", backgroundColor: "#323232" };
    case event_date == getCompareDate():
      if (element) element.setAttribute("data-event-status", "upcoming-event");
      return { status: "now", backgroundColor: "#D0021B" };
    default:
      if (element) element.setAttribute("data-event-status", "upcoming-event");
      return { status: "upcoming", backgroundColor: "#0161AF" };
  }
}
