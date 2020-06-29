import StickySidebar from "sticky-sidebar";
import "./main.scss";
import "sgds-govtech/js/sgds.js";

if (document.querySelector(".sidenav")) {
  new StickySidebar(".sidenav", {
    containerSelector: ".sidenav-container",
    innerWrapperSelector: ".sidebar__inner",
    topSpacing: 0,
  });
}

$(function(){
  $(".mobile-sidenav-toggle").click(function() {
    $(this)
      .children(".sgds-icon")
      .toggleClass("sgds-icon-chevron-down")
      .toggleClass("sgds-icon-chevron-up");
    $(".mobile-sidenav-menu").toggleClass("is-hidden");
  });

  function bindNavbarLinkIfMobile() {
    if(window.matchMedia("(max-width: 767px)").matches){
      // The viewport is less than 768 pixels wide
      
      $(".sgds-navbar-dropdown").addClass("is-hidden");
      
      $(".sgds-navbar-link").click(function() {
        $(`.${this.id}`).toggleClass("is-hidden");
      });
    } else {
      $(".sgds-navbar-dropdown").removeClass("is-hidden");
    }
  }

  // Attaching the event listener function to window's resize event
  window.addEventListener("resize", bindNavbarLinkIfMobile, false);

  // Calling the function for the first time
  bindNavbarLinkIfMobile();
});