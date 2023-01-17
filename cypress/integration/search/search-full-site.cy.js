/// <reference types="cypress" />

describe("Full Site Page Test", function () {
  context("Desktop Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/", {
        onBeforeLoad: win => {
          win.sessionStorage.clear();
        },
      });
    });

    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("Should be able to navigate to the full site page by typing a query into the top nav search bar", () => {
      cy.get("#query-desktop").type("test");
      cy.get("#query-desktop").type("{enter}");
      cy.url().should("include", "/search/?query=test");
    });

    it("Should render have at least 1 content when searching for the query, 'stack' is a common search term", () => {
      cy.get("#query-desktop").type("stack");
      cy.get("#query-desktop").type("{enter}");
      cy.get("#search-full-site-results")
        .children()
        .its("length")
        .should("be.gte", 1);
    });

    it("Should be able to check and uncheck the checkbox to filter the results", () => {
      // Check for default state of the checkboxes which should be checked
      cy.get("#checkbox-1").should("be.checked");
      cy.get("#checkbox-2").should("be.checked");
      cy.get("#checkbox-3").should("be.checked");
      cy.get("#checkbox-4").should("be.checked");
      cy.get("#checkbox-5").should("be.checked");

      cy.get("#checkbox_0").uncheck().should("not.be.checked");
      cy.get("#checkbox_1").uncheck().should("not.be.checked");
      cy.get("#checkbox_2").uncheck().should("not.be.checked");
      cy.get("#checkbox_3").uncheck().should("not.be.checked");
      cy.get("#checkbox_4").uncheck().should("not.be.checked");

      cy.get("#checkbox_0").check().should("be.checked");
      cy.get("#checkbox_1").check().should("be.checked");
      cy.get("#checkbox_2").check().should("be.checked");
      cy.get("#checkbox_3").check().should("be.checked");
      cy.get("#checkbox_4").check().should("be.checked");
    });

    it("Should have lesser content after filtering content by their tags (i.e. products, events communities)", () => {
      // Get the inital number of results and store it in a variable
      cy.get("#search-result-number-of-results")
        .invoke("text")
        .then(text => {
          const numb = parseInt(text.split("out of")[1].match(/\d/g).join(""));

          // Filter by the tags
          cy.get("#checkbox_0").uncheck().should("not.be.checked");

          // Get the number of results after filtering
          cy.get("#search-result-number-of-results")
            .invoke("text")
            .then(text => {
              const numb2 = parseInt(
                text.split("out of")[1].match(/\d/g).join("")
              );

              // Check if the number of results is less than the initial number
              expect(numb2).to.not.be.greaterThan(numb);
            });
        });
    });

    it("Should display the right number of pagination", () => {
      // Get the inital number of results and store it in a variable
      cy.get("#search-result-number-of-results")
        .invoke("text")
        .then(text => {
          const numb = parseInt(text.split("out of")[1].match(/\d/g).join(""));
          const numberOfPaginationList = Math.ceil(numb / 10);

          if (numb > 10) {
            cy.get(".sgds-pagination-list")
              .children()
              .its("length")
              .should("eq", numberOfPaginationList);
          }
        });
    });

    it("Should display the pagination if there are more than 10 content", () => {
      // Get the inital number of results and store it in a variable
      cy.get("#search-result-number-of-results")
        .invoke("text")
        .then(text => {
          const numb = parseInt(text.split("out of")[1].match(/\d/g).join(""));

          if (numb > 10) {
            cy.get("nav[id='search-full-site-results-pagination']").should(
              "be.visible"
            );
          } else if (numb != 0) {
            cy.get("#search-full-site-results")
              .children()
              .its("length")
              .should("be.eql", numb);
          } else {
            return;
          }
        });
    });

    it("Should be able to paginate forward through the results", () => {
      const visitTextPageIfPossible = () => {
        cy.get(".sgds-pagination-next").then($next => {
          cy.get($next).then($body => {
            const disabled = $body.attr("disabled");
            if (disabled === "disabled") {
              cy.log("**on the last page**");
              return;
            }

            cy.wait(500); // just for clarity
            cy.get(".sgds-pagination-next").click({ force: true });
            visitTextPageIfPossible();
          });
        });
      };

      visitTextPageIfPossible();
      cy.log("**on the last page**");
      // Testing the "next" list is disabled
      cy.get(".sgds-pagination-next").click({ force: true });
    });

    // Current filters should persist even after navigating away from the page
    it("Should persist the current filters", () => {
      // Get the inital number of results and store it in a variable
      cy.get("#checkbox_2").uncheck().should("not.be.checked");
      cy.get("#checkbox_4").uncheck().should("not.be.checked");

      cy.get("#search-result-number-of-results")
        .invoke("text")
        .then(text => {
          const numb = parseInt(text.split("out of")[1].match(/\d/g).join(""));

          cy.get("#query-desktop").type("stack");
          cy.get("#query-desktop").type("{enter}");

          cy.wait(3000);

          cy.get("#search-result-number-of-results")
            .invoke("text")
            .then(text => {
              const numb2 = parseInt(
                text.split("out of")[1].match(/\d/g).join("")
              );

              // Check if the number of results is less than the initial number
              expect(numb2).to.be.equal(numb);
            });
        });
    });
  });

  context("Mobile Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/", {
        onBeforeLoad: win => {
          win.sessionStorage.clear();
        },
      });
    });

    beforeEach(() => {
      cy.viewport("iphone-xr");
    });

    it("Should be able to navigate to the full site page by typing a query into the top nav search bar.", () => {
      cy.get(".sgds-navbar-burger").click({ force: true });

      cy.get("#query-mobile").type("test");
      cy.get("#query-mobile").type("{enter}");
      cy.url().should("include", "/search/?query=test");
    });

    it("Should render have at least 1 content when searching for the query, 'stack' is a common search term.", () => {
      cy.get("#search-full-site-dedicated-search-bar").type("stack ");
      cy.get("#search-full-site-dedicated-search-bar").type("{enter}");
      cy.get("#search-full-site-results")
        .children()
        .its("length")
        .should("be.gte", 1);
    });

    it("Should be able to check and uncheck the checkbox to filter the results", () => {
      cy.get("div[id='search-full-site-filter-dropdown-trigger']").click({
        force: true,
      });

      cy.get("#checkbox_5").uncheck().should("not.be.checked");
      cy.get("#checkbox_6").uncheck().should("not.be.checked");
      cy.get("#checkbox_7").uncheck().should("not.be.checked");
      cy.get("#checkbox_8").uncheck().should("not.be.checked");
      cy.get("#checkbox_9").uncheck().should("not.be.checked");

      cy.get("#checkbox_5").check().should("be.checked");
      cy.get("#checkbox_6").check().should("be.checked");
      cy.get("#checkbox_7").check().should("be.checked");
      cy.get("#checkbox_8").check().should("be.checked");
      cy.get("#checkbox_9").check().should("be.checked");
    });

    it("Should have lesser content after filtering content by their tags (i.e. products, events communities)", () => {
      // Get the inital number of results and store it in a variable
      cy.get("#search-result-number-of-results")
        .invoke("text")
        .then(text => {
          const numb = parseInt(text.split("out of")[1].match(/\d/g).join(""));

          // Filter by the tags
          cy.get("div[id='search-full-site-filter-dropdown-trigger']")
            .click({
              force: true,
            })
            .should("not.be.checked")
            .get("#checkbox_5")
            .uncheck({ force: true });

          // Get the number of results after filtering
          cy.get("#search-result-number-of-results")
            .invoke("text")
            .then(text => {
              const numb2 = parseInt(
                text.split("out of")[1].match(/\d/g).join("")
              );

              // Check if the number of results is less than the initial number
              expect(numb2).to.not.be.greaterThan(numb);
            });
        });
    });

    it("Should not display the pagination if there are more than 10 content since it's on mobile view.", () => {
      // Get the inital number of results and store it in a variable
      cy.get("#search-result-number-of-results")
        .invoke("text")
        .then(text => {
          const numb = parseInt(text.split("out of")[1].match(/\d/g).join(""));

          // If the number of results is greater than 10, then check if the pagination is not displayed
          if (numb > 10) {
            cy.get("#search-full-site-results")
              .siblings("nav")
              .should("not.be.visible");

            cy.get("#search-full-site-results")
              .children()
              .its("length")
              .should("be.eql", numb);
          }
        });
    });
  });
});
