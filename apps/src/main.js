import StickySidebar from "sticky-sidebar";

if (document.querySelector(".sidenav")) {
  new StickySidebar(".sidenav", {
    containerSelector: ".sidenav-container",
    innerWrapperSelector: ".sidebar__inner",
    topSpacing: 120
  });
}
