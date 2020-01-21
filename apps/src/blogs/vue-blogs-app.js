import Vue from "vue";
import BlogsApp from "./BlogsApp.vue";

Vue.use(require("vue-moment"));

new Vue({
  render: createElement => {
    return createElement(BlogsApp);
  }
}).$mount("#blogs-app");
