import "./main.scss";
import "sgds-govtech/js/sgds.js";
import { setupFloatingSocialMediaIcons } from "./lib/socialMediaIcons.js";

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

  // (function () {
  //   let floaterContainer = $("#floater-container");
  //   let floater = $("#floater");
  //   let offsetTop = floaterContainer.offset().top;
  //   window.onscroll = function () {
  //     floater.addClass("floating-social-media-buttons");
  //     // console.log(`window pageyoffset = ${window.pageYOffset}`);
  //     // console.log(offsetTop);
  //     if (window.pageYOffset < offsetTop) {
  //       floater.removeClass("floating-social-media-buttons");
  //     }
  //   };
  //   document.getElementById("#copy-link").addEventListener("click", function () {
  //     var inputBox = document.getElementById("page-url");
  //     if (inputBox.classList.contains("hide")) {
  //       inputBox.classList.remove("hide");
  //     }
  //     inputBox.select();
  //     document.execCommand("copy");
  //     inputBox.classList.add("hide");
  //   });
  // })();
  setupFloatingSocialMediaIcons();

});

