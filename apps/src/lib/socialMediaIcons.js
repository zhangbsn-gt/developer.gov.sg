function setupFloatingSocialMediaIcons() {
  let floaterContainer = $("#floater-container");
  let floater = $("#floater");
  let offsetTop = floaterContainer.offset().top;
  window.onscroll = function () {
    floater.addClass("floating-social-media-buttons");
    // console.log(`window pageyoffset = ${window.pageYOffset}`);
    // console.log(offsetTop);
    if (window.pageYOffset < offsetTop) {
      floater.removeClass("floating-social-media-buttons");
    }
  };
  document.getElementById("copy-link").addEventListener("click", function () {
    var inputBox = document.getElementById("page-url");
    if (inputBox.classList.contains("hide")) {
      inputBox.classList.remove("hide");
    }
    inputBox.select();
    document.execCommand("copy");
    inputBox.classList.add("hide");
  });

}
export { setupFloatingSocialMediaIcons };