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

export function convertDateForIos(date) {
  var arr = date.split(/[- :]/);
  date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  return date;
}

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
