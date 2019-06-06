import Vue from "vue";
import EditProduct from "./EditProduct.vue";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import "quill/dist/quill.snow.css";

import VModal from "vue-js-modal";

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

const mountElement = document.querySelector("#edit-product-app");
new Vue({
    render: createElement => {
        return createElement(EditProduct, {
            props: {
                ...mountElement.dataset
            }
        });
    }
}).$mount("#edit-product-app");