import Vue from "vue";
import SearchAllEventVideos from "./SearchAllEventVideos.vue";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

new Vue({
  el: "#search-app-all-event-videos",
  render: h => h(SearchAllEventVideos),
});
