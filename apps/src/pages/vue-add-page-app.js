import Vue from "vue";
import store from "../lib/pageEditorStore";
import AddPageApp from "./AddPageApp.vue";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";

const mountElement = document.querySelector("#add-page");
new Vue({
  store,
  render: createElement => {
    return createElement(AddPageApp, {
      props: {
        ...mountElement.dataset
      }
    });
  }
}).$mount("#add-page");
