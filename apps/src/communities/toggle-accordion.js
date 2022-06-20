const { jQuery } = window;

const $ = jQuery;
if (!jQuery) {
  throw new Error(
    "Toggle-Accordion couldn't initialize; please make sure jQuery is loaded!"
  );
}

$(document).ready(function () {
  // back to the top
  function toggleAccordions(shouldExpand = false) {
    document.querySelectorAll(".sgds-accordion").forEach(function (accordion) {
      const header = accordion.querySelector(".sgds-accordion-header");
      const headerAttribute = header.getAttribute("aria-expanded");

      if (shouldExpand) {
        if (headerAttribute === "false") {
          header.click();
        }
      } else {
        if (headerAttribute === "true") {
          header.click();
        }
      }
    });
  }

  // add event listeners to id, 'button-collapse-all-accordions' and 'button-expand-all-accordions'
  $("#button-collapse-all-accordions").on("click", function () {
    toggleAccordions(false);
  });

  $("#button-expand-all-accordions").on("click", function () {
    toggleAccordions(true);
  });
});
