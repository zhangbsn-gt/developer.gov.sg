import Vue from "vue";
import store from "../lib/pageEditorStore";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";

import ArticleApp from "./ArticleApp.vue";

const mountElement = document.querySelector("#article-editor-app");
new Vue({
  store,
  render: createElement => {
    return createElement(ArticleApp, {
      props: {
        ...mountElement.dataset
      }
    });
  }
}).$mount("#article-editor-app");
