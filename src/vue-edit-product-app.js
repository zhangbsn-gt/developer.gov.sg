import Vue from "vue";
import EditProduct from "./EditProduct.vue";

const mountElement = document.querySelector("#edit-app");
new Vue({
    render: createElement => {
        return createElement(EditProduct, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#edit-app");