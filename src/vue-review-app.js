import Vue from "vue";
import ReviewApp from "./ReviewApp.vue";
import VueCookies from "vue-cookies";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
Vue.use(VueCookies);
Vue.use(require("vue-moment"));

new Vue({
    render: createElement => {
        return createElement(ReviewApp);
    }
}).$mount("#review");
