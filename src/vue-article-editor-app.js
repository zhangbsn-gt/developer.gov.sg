import Vue from "vue";
import ArticleApp from "./ArticleApp.vue";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import "quill/dist/quill.snow.css";

import VModal from "vue-js-modal";

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

const mountElement = document.querySelector("#article-editor-app");
new Vue({
    render: createElement => {
        return createElement(ArticleApp, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#article-editor-app");