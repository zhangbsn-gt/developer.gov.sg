import Vue from "vue";
import AddPageApp from "./AddPageApp.vue";

const mountElement = document.querySelector("#add-page");

new Vue({
    render: createElement => {
        return createElement(AddPageApp, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#add-page");
