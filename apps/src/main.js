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

  $(".js-thumbs-up").click(function () {
    ga(`gtag_${gaId}.send`, {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'thumbs-up',
      eventLabel: 'thumbs-up-icon',
      eventValue: 1
    });
  });

  $("js-thumbs-down").click(function () {
    ga(`gtag_${gaId}.send`, {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'thumbs-down',
      eventLabel: 'thumbs-down-icon',
      eventValue: 0
    });
  });
});

