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

  if(window.matchMedia("(max-width: 767px)").matches){
      // The viewport is less than 768 pixels wide
      alert("This is a mobile device.");
  } else{
      // The viewport is at least 768 pixels wide
      alert("This is a tablet or desktop.");
  }
});