import Vue from "vue";
import SearchAllEvents from "./SearchAllEvents.vue";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

new Vue({
  el: "#search-app-all-events",
  render: (h) => h(SearchAllEvents, {
  }),
});