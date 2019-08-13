import Vue from "vue";
import AddPageApp from "./AddPageApp.vue";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import "quill/dist/quill.snow.css";

const mountElement = document.querySelector("#addpage");

new Vue({
    render: createElement => {
        return createElement(AddPageApp, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#addpage");
