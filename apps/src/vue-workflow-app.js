import Vue from "vue";
import Workflow from "./Workflow.vue";

new Vue({
    render: createElement => {
        return createElement(Workflow);
    }
}).$mount("#workflow");
