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

  $(".sgds-navbar-link.mobile").click(function() {
    $(this)
      .next()
      .toggleClass("is-hidden-touch");
  });

  let floaterContainer = $("#floater-container");
  let floater = $("#floater");
  let offsetTop = floaterContainer.offset().top;
  window.onscroll = function () {
    // console.log(floaterContainer.offset());
    floater.addClass("float-buttons");
    // console.log(`innerheight ${window.innerHeight}`);
    // console.log(`page y offset ${window.pageYOffset}`);
    
    if (window.pageYOffset < offsetTop) {
      console.log("here");
      floater.removeClass("float-buttons");
    }
  };
});

