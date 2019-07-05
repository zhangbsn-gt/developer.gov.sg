<template>
    <div id="review">
        <div class="row has-text-centered">
            <div class="col">
                <label for="search-input">
                    <h5>Review Product Contents</h5>
                </label>
            </div>
        </div>
        <div class="row" style="min-height: 50vh">
            <div class="col">
                <a class="sgds-button is-rounded is-fullwidth" href="/.netlify/functions/api/oauth">Login with Github</a>
                <a class="sgds-button is-rounded is-fullwidth" @click="test">Test</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            page_content: null
        };
    },
    methods: {
        test : function(event) {
            axios.get("/.netlify/functions/api/reviews").then(response => {
                console.log(response);
            });
        }
    }
};
</script>
