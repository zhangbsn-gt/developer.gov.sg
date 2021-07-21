import "./main.scss";
import "sgds-govtech/js/sgds.js";

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

  // START: Thumbs up/down and feedback modal
  const eventCategory = 'feedback_rating';

  /**
   * Read more here about sending Google Analytics Event
   * https://developers.google.com/analytics/devguides/collection/gtagjs/events
   * 
   * Try to use the default Google Analytics Event as much as possible
   */

  // Create a timeout function to show the success message regardless whether
  // the submission is successful
  function createFunctionWithTimeout(callback, opt_timeout) {
    var called = false;
    function fn() {
      if (!called) {
        called = true;
        callback();
      }
    }
    setTimeout(fn, opt_timeout || 1000);
    return fn;
  }

  function showSuccessMessageAndFeedbackModal(useful) {
    let feedbackThumbs = $('#feedback .feedback__thumb');
    let feedbackSuccess = $('#feedback .feedback__success');
    let feedbackModalUsefulYes = $('#feedback-modal-useful-yes');
    let feedbackModalUsefulNo = $('#feedback-modal-useful-no');
    // Show success message
    $(feedbackThumbs).addClass('is-hidden');
    $(feedbackSuccess).removeClass('is-hidden');
    // Show feedback modal
    if (useful) {
      feedbackModalUsefulYes.addClass('is-active');
    } else {
      feedbackModalUsefulNo.addClass('is-active');
    }
  }

  function hideFeedbackModal() {
    let feedbackModal = $('.js-feedback-useful-modal');
    feedbackModal.removeClass('is-active');
  }
  /**
   *   After user indicates whether an article is useful or not, we will try to get more feedback from the user
   *   
   *   Events sequence:
   *   thumbs_up or thumbs_down -> feedback_modal_close or feedback_modal_send_feedback
   */

  // Event listeners
  // Thumbs-up
  $(".js-thumbs-up").click(function () {
    gtag('event', 'thumbs_up', {
      event_category: eventCategory,
      event_label: 'thumbs_up_icon',
      value: 1,
      event_callback: () => {
        createFunctionWithTimeout(showSuccessMessageAndFeedbackModal.bind(null, true), 200)
      }
    });
  });
  // Thumbs-down
  $(".js-thumbs-down").click(function () {
    gtag('event', 'thumbs_down', {
      event_category: eventCategory,
      event_label: 'thumbs_down_icon',
      value: 0,
      event_callback: function() {
        createFunctionWithTimeout(showSuccessMessageAndFeedbackModal.bind(null, false), 200)
      }
    });
  });
  // send-feedback
  $(".js-send-feedback-modal").click(function() {
    gtag('event', 'feedback_modal_send_feedback', {
      event_category: eventCategory,
      event_label: 'send_feedback',
      event_callback: () => {
        createFunctionWithTimeout(hideFeedbackModal, 200)
      }
    });
  })
  // close-feedback-modal
  $(".js-close-feedback-modal").click(function() {
    gtag('event', 'feedback_modal_close', {
      event_category: eventCategory,
      event_label: 'close_feedback_modal',
      event_callback: () => {
        createFunctionWithTimeout(hideFeedbackModal, 200)
      }
    });
  })
  // END: Thumbs up/down and feedback modal
});

