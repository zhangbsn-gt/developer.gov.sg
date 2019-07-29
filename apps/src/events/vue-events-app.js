import Vue from "vue";
import EventsApp from "./EventsApp.vue";

Vue.use(require("vue-moment"));

new Vue({
    render: createElement => {
        return createElement(EventsApp);
    }
}).$mount("#events-app");
