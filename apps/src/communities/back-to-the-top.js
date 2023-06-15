import { debounce } from "../lib/communities";

(() => {
  try {
    const showOnPx = 50;
    const backToTheTopButton = document.getElementById("navigate-to-the-top-button");

    const topFunction = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const scrollFunction = () => {
      const scrollVal = window.scrollY || document.documentElement.scrollTop;

      backToTheTopButton.classList.toggle("back-to-the-top-button-hidden", scrollVal <= showOnPx);
    };

    backToTheTopButton.addEventListener("click", topFunction);
    window.addEventListener("scroll", debounce(scrollFunction, 10));
    window.addEventListener("touchmove", debounce(scrollFunction, 10));
  } catch (e) {
    console.log("Error, back-to-the-top: " + e);
  }
})();
