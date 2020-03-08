import StickySidebar from "sticky-sidebar";
import "./main.scss";
import "sgds-govtech/js/sgds.js";

if (document.querySelector(".sidenav")) {
  new StickySidebar(".sidenav", {
    containerSelector: ".sidenav-container",
    innerWrapperSelector: ".sidebar__inner",
    topSpacing: 0
  });
}
