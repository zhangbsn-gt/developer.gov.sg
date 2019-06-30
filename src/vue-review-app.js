import Vue from "vue";
import ReviewApp from "./ReviewApp.vue";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";

new Vue({
    render: createElement => {
        return createElement(ReviewApp);
    }
}).$mount("#review");