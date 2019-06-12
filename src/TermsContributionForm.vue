<template>
    <div class="sgds-card">
        <form @submit.prevent="handleSubmit">
            <div class="sgds-card-content">
                <p>Have an initialism/acronym to contribute? Suggest them to us here!</p>

                <div>
                    <label for="contributor">Your name*</label>
                    <input
                        id="contributor"
                        name="contributor"
                        class="input"
                        type="text"
                        v-model="form.contributor"
                        required
                    >
                </div>

                <div>
                    <label for="contributor-email">Your government email*</label>
                    <input
                        id="contributor-email"
                        name="contributor_email"
                        class="input"
                        type="email"
                        placeholder="me@.gov.sg"
                        v-model="form.contributor_email"
                        required
                    >
                </div>

                <div>
                    <label for="term">Initialism/acronym*</label>
                    <input
                        id="term"
                        name="term"
                        class="input"
                        type="text"
                        placeholder="SGTS"
                        v-model="form.term"
                        required
                    >
                </div>

                <div>
                    <label for="full-term">Full term*</label>
                    <input
                        id="full-term"
                        name="full_term"
                        class="input"
                        type="text"
                        placeholder="Singapore Government Tech Stack"
                        v-model="form.full_term"
                        required
                    >
                </div>

                <div>
                    <label for="description">Short description*</label>
                    <input
                        id="description"
                        name="description"
                        class="input"
                        type="text"
                        placeholder="SGTS is ..."
                        v-model="form.description"
                        required
                    >
                </div>

                <div>
                    <label for="link">Links/URLs</label>
                    <input
                        id="link"
                        name="link"
                        class="input"
                        type="text"
                        placeholder="https://tech.gov.sg"
                        v-model="form.link"
                    >
                </div>

                <div>
                    <label for="categories">Categories</label>
                    <div>
                        <p v-for="(category, index) of form.categories" :key="index">
                            {{ category }}
                            <span
                                class="sgds-icon sgds-icon-cross"
                                @click="form.categories.splice(index, 1)"
                                :style="{cursor: 'pointer'}"
                            ></span>
                        </p>
                    </div>
                    <input
                        id="categories"
                        name="categories"
                        class="input"
                        type="text"
                        placeholder="platform, data"
                        v-model="form.category"
                    >
                    <button
                        class="sgds-button is-primary"
                        type="button"
                        @click.prevent="addCategory(form.category)"
                    >Add</button>
                </div>
            </div>
            <div class="sgds-card-footer">
                <div class="sgds-card-footer-item">
                    <span>
                        <button
                            class="sgds-button"
                            :style="{minWidth: '100px'}"
                            type="submit"
                            :disabled="processingSubmission"
                        >
                            <template v-if="!processingSubmission">Submit</template>
                            <template v-else>
                                <LoadingSpinner/>
                            </template>
                        </button>
                    </span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import { urlEncode } from "./lib";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
    components: { LoadingSpinner },
    data: function() {
        return {
            processingSubmission: false,
            form: {
                contributor: null,
                contributor_email: null,
                term: null,
                full_term: null,
                description: null,
                link: null,
                category: null,
                categories: []
            }
        };
    },
    methods: {
        addCategory(category) {
            this.form.categories.push(category);
        },
        handleSubmit() {
            this.processingSubmission = true;
            axios
                .post("/.netlify/functions/api/terms", {
                    contributor: this.form.contributor,
                    contributor_email: this.form.contributor_email,
                    term: this.form.term,
                    full_term: this.form.full_term,
                    description: this.form.description,
                    link: this.form.link,
                    categories: this.form.categories
                })
                .then(response => {
                    new Noty({
                        type: "success",
                        text: `Your term has been submitted! You can view its approval progress <a href='${
                            response.data.pr
                        }'>here.</a>`
                    }).show();
                })
                .catch(error => {
                    new Noty({
                        type: "error",
                        text: `An error has occurred: ${error.message || error}`
                    }).show();
                })
                .finally(() => {
                    this.processingSubmission = false;
                });
        }
    }
};
</script>
