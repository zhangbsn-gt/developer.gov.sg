import Vue from "vue";
import EditCategory from "./EditCategory.vue";

const mountElement = document.querySelector("#edit-category");
new Vue({
    render: createElement => {
        return createElement(EditCategory, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#edit-category");