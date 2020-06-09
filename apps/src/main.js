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

$(".mobile-sidenav-toggle").click(function() {
  $(this)
    .children(".sgds-icon")
    .toggleClass("sgds-icon-chevron-down")
    .toggleClass("sgds-icon-chevron-up");
  $(".mobile-sidenav-menu").toggleClass("is-hidden");
});
