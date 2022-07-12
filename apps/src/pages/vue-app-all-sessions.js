import Vue from "vue";
import AllSessionsApp from "./AllSessionsApp.vue";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

new Vue({
  el: "#app-all-sessions",
  render: h => h(AllSessionsApp),
});
