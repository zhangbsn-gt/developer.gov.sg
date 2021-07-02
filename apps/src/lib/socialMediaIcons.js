function setupFloatingSocialMediaIcons() {
  const floaterContainer = $("#floater-container");
  if (floaterContainer.children().length == 0) {
    //if floaterContainer is an empty element
    return;
  }
  const floater = $("#floater");
  const offsetTop = floaterContainer.offset().top;
  window.onscroll = function () {
    floater.addClass("floating-social-media-buttons");
    if (window.pageYOffset < offsetTop) {
      floater.removeClass("floating-social-media-buttons");
    }
  };
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
}
export { setupFloatingSocialMediaIcons };