/// <reference types="cypress" />
const yaml = require("js-yaml");

describe("Home Page Carousel Test", function () {
  context("Desktop Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/");
    });

    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("Should it contain the carousel section", () => {
      cy.get('.swiper-carousel')
    });

    it("Should it contain the carousel next and prev button", () => {
      cy.get('.swiper-button-prev-hero')
      cy.get('.swiper-button-next-hero')
    });

    it("Should it contain the carousel pagination button", () => {
      cy.get('.swiper-pagination-hero')
    });

    it("Should it contain the one stop reource slide", () => {
      cy.get('.swiper-slide-active > .sgds-card > .sgds-section')
    });

    it("Should it be able to navigate to next slide", () => {
      cy.get('.swiper-button-next-hero > img').click({
            force: true,
      });
    });

    it("Should it be able to navigate to prev slide", () => {
      cy.get('.swiper-button-prev-hero > img').click({
            force: true,
      });
    });
  });

  context("Mobile Test Case", () => {
    before(() => {
      // Navigate to the root
      cy.visit("/");
    });

    beforeEach(() => {
      cy.viewport("iphone-xr");
    });

    it("Should it contain the carousel section", () => {
      cy.get('.swiper-carousel')
    });

    it("Should it contain the carousel next and prev button", () => {
      cy.get('.swiper-button-prev-hero')
      cy.get('.swiper-button-next-hero')
    });

    it("Should it contain the carousel pagination button", () => {
      cy.get('.swiper-pagination-hero')
    });

    it("Should it contain the one stop reource slide", () => {
      cy.get('.swiper-slide-active > .sgds-card > .sgds-section')
    });

    it("Should it be able to navigate to next slide", () => {
      cy.get('.swiper-button-next-hero > img').click({
            force: true,
      });
    });

    it("Should it be able to navigate to prev slide", () => {
      cy.get('.swiper-button-prev-hero > img').click({
            force: true,
      });
    });
  });
});
