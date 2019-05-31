import Vue from "vue";
import TermsApp from "./TermsApp.vue";

new Vue({
    render: createElement => {
        return createElement(TermsApp);
    }
}).$mount("#terms");