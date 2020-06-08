import Vue from "vue";
import EventsApp from "./EventsApp.vue";

Vue.use(require("vue-moment"));

const appElement = document.querySelector("#events-app");

new Vue({
  render: (createElement) => {
    return createElement(EventsApp, {
      props: {
        ...appElement.dataset,
      },
    });
  },
}).$mount(appElement);
