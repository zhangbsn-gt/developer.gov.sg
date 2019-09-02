import Vue from "vue";
import TermsApp from "./TermsApp.vue";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";

new Vue({
  render: createElement => {
    return createElement(TermsApp);
  }
}).$mount("#terms");
