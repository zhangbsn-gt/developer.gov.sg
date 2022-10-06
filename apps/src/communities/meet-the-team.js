const { jQuery } = window;
import { debounce } from "../lib/communities";

const $ = jQuery;
if (!jQuery) {
  throw new Error(
    "Meet-the-team couldn't initialize; please make sure jQuery is loaded!"
  );
}

$(document).ready(function () {
  const additionalPadding = window.innerWidth < 768 ? 5 : 20;

  function getBioAndTitleDivHeight(el) {
    const bioHeight = $(el).find(".meet-the-team-content-bio").height();
    const titleHeight = $(el).find(".meet-the-team-content-title").height();
    return bioHeight + titleHeight;
  }

  function getNumberOfGridColumnCount() {
    // Get the element by its id
    const grid = document.getElementById("meet-the-team-grid");
    // calc computed style
    const gridComputedStyle = window.getComputedStyle(grid);
    // Get computed property of the number of grid columns
    return {
      // get number of grid rows
      gridRowCount: gridComputedStyle
        .getPropertyValue("grid-template-rows")
        .split(" ").length,
      // get number of grid columns
      gridColumnCount: gridComputedStyle
        .getPropertyValue("grid-template-columns")
        .split(" ").length,
    };
  }

  function scaleContentPadding() {
    let { gridColumnCount } = getNumberOfGridColumnCount();

    // We want to set the card on each row to be the same height as each other
    // For example, if the first card is 100px tall, then the second card should be 100px tall, but if the third card is 200px tall, then the fourth card should be 200px tall
    // Get all the cards
    const cards = document.querySelectorAll(".meet-the-team-card");
    // Group the variables(height) into groups based on the gridColumnCount
    const cardHeightGroups = Array.from(cards).reduce(function (r, v, i) {
      if (i % gridColumnCount === 0) r.push([]);
      r[r.length - 1].push(getBioAndTitleDivHeight(v));
      return r;
    }, []);

    // Find the maxiumum height of the each group
    const maximumOfEachCardHeightGroups = cardHeightGroups.map(function (
      group
    ) {
      return Math.max.apply(null, group);
    });

    // Apply the maximum height of each card of their respective row
    $(".meet-the-team-card").each(function (index) {
      $(this)
        .find(".meet-the-team-content")
        .css(
          "height",
          `${
            maximumOfEachCardHeightGroups[Math.floor(index / gridColumnCount)] +
            additionalPadding
          }px`
        );
    });
  }

  // Initialize resize observer object
  let resizeObserver = new ResizeObserver(
    debounce(() => {
      scaleContentPadding();
    }, 100)
  );

  // Call the function to set the height of the meet-the-team-content div
  resizeObserver.observe(document.getElementsByTagName("body")[0]);
});
