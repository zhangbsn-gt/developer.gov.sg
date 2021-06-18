import "./main.scss";
import "sgds-govtech/js/sgds.js";

// import Swiper JS
import Swiper from 'swiper';
 // core version + navigation, pagination modules:
import SwiperCore, { Navigation } from 'swiper/core';

 // configure Swiper to use modules
SwiperCore.use([Navigation]);
  // import Swiper styles

$(function() {
  $(".mobile-sidenav-toggle").click(function() {
    $(this)
      .children(".sgds-icon")
      .toggleClass("sgds-icon-chevron-down")
      .toggleClass("sgds-icon-chevron-up");
    $(".mobile-sidenav-menu").toggleClass("is-hidden");
  });

  $(".sgds-navbar-link.mobile").click(function() {
    $(this)
      .next()
      .toggleClass("is-hidden-touch");
  });
});

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  slidesPerView: 1.1,
  spaceBetween: 8,
  centeredSlides: true,
  loop: true,
  autoHeight: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
      loop: true,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
      loop: true,
    },
  },
});