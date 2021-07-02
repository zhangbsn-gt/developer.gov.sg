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

  (function () {
    let inputBox = document.getElementById("page-url");
    let inputBoxMobile = document.getElementById("page-url-mobile");
    document.getElementById("copy-link").addEventListener("click", function () { copyInputToClipboard(inputBox); });
    document.getElementById("copy-link-mobile").addEventListener("click", function () { copyInputToClipboard(inputBoxMobile); });
    function copyInputToClipboard(inputBox) {
      if (inputBox.classList.contains("hide")) {
        inputBox.classList.remove("hide");
      }
      inputBox.select();
      document.execCommand("copy");
      inputBox.classList.add("hide");
    }
  })();
});

