import "./main.scss";
import "sgds-govtech/js/sgds.js";
import config from "./lib/config";

$(function () {
  $(".mobile-sidenav-toggle").click(function () {
    $(this)
      .children(".sgds-icon")
      .toggleClass("sgds-icon-chevron-down")
      .toggleClass("sgds-icon-chevron-up");
    $(".mobile-sidenav-menu").toggleClass("is-hidden");
  });

  $(".sgds-navbar-link.mobile").click(function () {
    $(this)
      .next()
      .toggleClass("is-hidden-touch");
  });

  // GA-12345 -> GA_12345 for consistency with GAID set by GA on startup
  const gaId = config.gaId.replace(/-/g, '_');
  const eventCategory = 'Test Feedback';

  // Enable feedback feature
  if (localStorage.getItem('enableFeedback') === '1') {
    $('#feedback').removeClass('is-hidden');
  }

  /**
   * Read more here about sending Google Analytics Event
   * https://developers.google.com/analytics/devguides/collection/gtagjs/events
   * 
   * Try to use the default Google Analytics Event as much as possible
   */

  $(".js-thumbs-up").click(function() {
    gtag('event',  'thumbs-up', {
      event_category: eventCategory,
      event_label: 'thumbs-up-icon',
      value: 1
    });
  });

  $("js-thumbs-down").click(function() {
    gtag('event',  'thumbs-down', {
      event_category: eventCategory,
      event_label: 'thumbs-up-icon',
      value: 1
    });
  });
});

