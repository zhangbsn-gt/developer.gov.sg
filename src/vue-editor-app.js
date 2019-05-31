import Vue from "vue";
import EditorApp from "./EditorApp.vue";

const mountElement = document.querySelector("#edit-app");
new Vue({
    render: createElement => {
        return createElement(EditorApp, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#edit-app");