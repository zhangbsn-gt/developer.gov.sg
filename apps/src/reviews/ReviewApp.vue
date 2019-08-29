<template>
    <div id="review">
        <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
        <div class="row" v-if="isAuthenticated && !isViewing">
            <div class="col is-12 review-header">
                <small class="margin--right--sm">signed in as {{ githubUser }}</small>
                <button class="sgds-button is-rounded" @click.prevent="performSignOut">Sign Out</button>
            </div>
        </div>
        <div class="row" style="min-height: 50vh" v-if="isAuthenticated">
            <div class="col" v-if="isViewing">
                <div v-html="prettyHtml" />
                <div class="row">
                    <div class="col is-3 is-paddingless">
                        <a
                            class="sgds-button is-rounded margin--top"
                            @click.prevent="mergePullRequest"
                        >Accept</a>
                        <a
                            class="sgds-button is-rounded margin--top"
                            @click.prevent="rejectPullRequest"
                        >Reject</a>
                    </div>
                    <div class="col is-9 has-text-right is-paddingless">
                        <a
                            class="sgds-button is-rounded margin--top has-text-right"
                            @click.prevent="refreshPageState"
                        >Back</a>
                    </div>
                </div>
            </div>
            <div class="col" v-else>
                <div
                    v-for="pr of pullRequests"
                    v-cloak
                    class="sgds-card margin--bottom--sm"
                    :key="pr.id"
                >
                    <div class="sgds-card-content">
                        <div class="row">
                            <div class="col">
                                <p class="has-text-weight-bold">{{pr.title}}</p>
                                <template v-if="pr.labels.length > 0">
                                    <label
                                        v-for="label of pr.labels"
                                        :key="label"
                                        class="margin--right--sm"
                                    >
                                        <span
                                            class="sgds-tag"
                                            :style="{backgroundColor: `#${label.color}`}"
                                        >{{label.name}}</span>
                                    </label>
                                </template>
                                <p>created {{ pr.updated_at | moment("dddd, MMMM Do YYYY") }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col has-text-right is-paddingless">
                                <a
                                    @click.prevent="viewPullRequest(pr.product, pr.number, pr.diff_url)"
                                >View</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="pullRequests.length === 0">
                    <div class="sgds-card margin--bottom--sm">
                        <div class="sgds-card-content">
                            <div class="row">
                                <div class="col is-12 is-paddingless has-text-centered">
                                    <p
                                        class="has-text-weight-bold"
                                    >You have no pending content changes to approve.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="min-height: 50vh" v-else>
            <div class="col">
                <a
                    class="sgds-button is-rounded is-fullwidth"
                    href="/.netlify/functions/api/oauth"
                >Login with Github</a>
            </div>
        </div>
    </div>
</template>

<script>
import Noty from "noty";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { Diff2Html } from "diff2html";
import "diff2html/dist/diff2html.min.css";

export default {
    data() {
        return {
            isLoading: true,
            fullPage: false,
            isAuthenticated: false,
            pullRequests: [],
            diffs: "",
            isViewing: false,
            currentPullNumber: null,
            title: "Product Contents Changes"
        };
    },
    components: {
        Loading
    },
    methods: {
        checkPageStatus() {
            if ($cookies.isKey("_devpo")) {
                this.isAuthenticated = true;
                axios
                    .get("/.netlify/functions/api/review")
                    .then(response => {
                        this.githubUser = response.data.githubUser;
                        this.pullRequests = response.data.pullRequests;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        // Authenticated user is not suppose to be reviewing contents or token is invalid
                        // Forcing a relogin to grab a new token
                        $cookies.remove("_devpo");
                        new Noty({
                            type: "error",
                            text:
                                "Error fetching product contents. Please login and try again."
                        }).show();
                        this.refreshPageState();
                    });
            } else {
                this.isLoading = false;
            }
        },
        viewPullRequest(product, number, diff_url) {
            this.isLoading = true;
            this.isViewing = true;
            this.currentPullNumber = number;
            this.title = `Review changes for ${product}`;
            axios
                .get("/.netlify/functions/api/review-diff", {
                    params: {
                        diff_url: diff_url
                    }
                })
                .then(response => {
                    this.diffs = response.data;
                    this.isLoading = false;
                })
                .catch(err => {
                    new Noty({
                        type: "error",
                        text:
                            "Error fetching product contents changes. Please try again."
                    }).show();
                    this.refreshPageState();
                });
        },
        refreshPageState: function() {
            // reset state to perform refresh
            this.isViewing = false;
            this.currentPullNumber = null;
            this.isLoading = true;
            this.isAuthenticated = false;
            this.pullRequests = [];
            this.title = "Product Contents Changes";
            this.diffs = "";
            this.checkPageStatus();
        },
        mergePullRequest: function() {
            this.isLoading = true;
            axios
                .get("/.netlify/functions/api/review-merge", {
                    params: {
                        number: this.currentPullNumber
                    }
                })
                .then(response => {
                    new Noty({
                        type: "success",
                        text: "Content has been merged successfully."
                    }).show();
                })
                .catch(err => {
                    new Noty({
                        type: "error",
                        text:
                            "Error accepting content changes. Please try again."
                    }).show();
                })
                .finally(() => {
                    this.refreshPageState();
                });
        },
        rejectPullRequest: function() {
            this.isLoading = true;
            axios
                .get("/.netlify/functions/api/review-reject", {
                    params: {
                        number: this.currentPullNumber
                    }
                })
                .then(response => {
                    new Noty({
                        type: "success",
                        text: "Content has been rejected successfully."
                    }).show();
                })
                .catch(err => {
                    new Noty({
                        type: "error",
                        text:
                            "Error rejecting content changes. Please try again."
                    }).show();
                })
                .finally(() => {
                    this.refreshPageState();
                });
        },
        performSignOut: function() {
            $cookies.remove("_devpo");
            new Noty({
                type: "success",
                text: "Successfully signed out"
            }).show();
            this.refreshPageState();
        }
    },
    created() {
        this.checkPageStatus();
    },
    computed: {
        prettyHtml() {
            return Diff2Html.getPrettyHtml(this.diffs, {
                inputFormat: "diff",
                showFiles: false,
                matching: "lines",
                outputFormat: "side-by-side"
            });
        }
    }
};
</script>

<!-- Custom style for the code diff viewer -->
<style>
.content table td,
.content table th {
    border: none;
    border-width: none;
    padding: 0px;
    vertical-align: none;
}

.d2h-file-header {
    display: none;
}

.vld-overlay .vld-background {
    opacity: 1 !important;
}

.vld-overlay:focus {
    outline: none;
}

.review-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
