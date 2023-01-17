import { createApp } from "vue";
import moment from "vue-moment";
import EventsApp from "./EventsApp.vue";

const app = createApp(EventsApp);
app.use(moment);

const appElement = document.querySelector("#events-app");
app.mount(appElement, {
  props: {
    ...appElement.dataset,
  },
});
