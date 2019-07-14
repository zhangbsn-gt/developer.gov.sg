<template>
    <div id="review">
        <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
        <div class="row has-text-centered" v-if="!isLoading">
            <div class="col">
                <label for="search-input"><h5>Review Product Contents</h5></label>
            </div>
        </div>
        <div class="row" style="min-height: 50vh" v-if="isAuthenticated">
            <div class="col">
                <div v-for="pr of pullRequests" v-cloak class="sgds-card margin--bottom--sm">
                    <div class="sgds-card-content">
                        <div class="row">
                            <div class="col is-3 is-paddingless">
                                <h6 class="margin--top is-uppercase">{{pr.product}}</h6>
                            </div>
                            <div class="col is-9 is-paddingless">
                                <p class="has-text-weight-bold">{{pr.title}}</p>
                                <p>{{ pr.updated_at | moment("dddd, MMMM Do YYYY") }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col has-text-right is-paddingless">
                                <a href @click.prevent="viewPullRequest(pr.number, pr.diff_url)">View</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sgds-card-content" v-if="pullRequests">
                    <div class="row">
                        <div class="col is-12 is-paddingless has-text-centered">
                            <h6 class="margin--top is-uppercase">You have no pull requests :)</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="min-height: 50vh" v-else>
            <div class="col">
                <a class="sgds-button is-rounded is-fullwidth" href="/.netlify/functions/api/oauth">Login with Github</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


export default {
    data() {
        return {
            isLoading: true,
            fullPage: false,
            isAuthenticated: false,
            pullRequests: []
        };
    },
    components: {
        Loading
    },
    methods: {
        checkPageStatus: function() {
            if ($cookies.isKey('_devpo')) {
                this.isAuthenticated = true;
                axios.get("/.netlify/functions/api/reviews").then(response => {
                    console.log(response.data);
                    this.pullRequests = response.data;
                    this.isLoading = false;
                });
            } else {
                this.isLoading = false;
            }
        },
        viewPullRequest(number, diff_url) {
            axios.get("/.netlify/functions/api/reviews-diff").then(response => {
                console.log(response);
            });
            // console.log(number);
            // console.log(diff_url);
        },
    },
    beforeMount() {
        this.checkPageStatus()
    },
};
</script>
