import Vue from "vue";
import BlogsApp from "./BlogsApp.vue";

new Vue({
  render: createElement => {
    return createElement(BlogsApp);
  }
}).$mount("#blogs-app");
