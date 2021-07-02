function setupFloatingSocialMediaIcons() {
  const floaterContainer = $("#floater-container");
  if(floaterContainer.children().length == 0){
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