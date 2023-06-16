// Check if jQuery is loaded
const { jQuery } = window;
if (!jQuery) {
  throw new Error(
    "Toggle-Accordion couldn't initialize; please make sure jQuery is loaded!"
  );
}

const $ = jQuery;

// Function to toggle accordions
function toggleAccordions(shouldExpand = false) {
  $(".sgds-accordion").each(function () {
    const header = $(this).find(".sgds-accordion-header");
    const headerAttribute = header.attr("aria-expanded");

    // Check if the header attribute matches the desired state for expansion/collapse
    if ((shouldExpand && headerAttribute === "false") || (!shouldExpand && headerAttribute === "true")) {
      header.click(); // Trigger a click event on the header to toggle the accordion
    }
  });
}

$(document).ready(function () {
  // Add event listeners to buttons

  // Button to collapse all accordions
  $("#button-collapse-all-accordions").on("click", function () {
    toggleAccordions(false); // Call the toggleAccordions function with the 'shouldExpand' parameter set to false
  });

  // Button to expand all accordions
  $("#button-expand-all-accordions").on("click", function () {
    toggleAccordions(true); // Call the toggleAccordions function with the 'shouldExpand' parameter set to true
  });
});
