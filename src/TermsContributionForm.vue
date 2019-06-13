<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="contributor">Your name*</label>
            <input
                id="contributor"
                name="contributor"
                class="input"
                :class="{'is-danger': errors.contributor}"
                type="text"
                v-model="form.contributor"
                required
            >
            <p class="help is-danger" v-if="errors.contributor">{{errors.contributor}}</p>
        </div>

        <div>
            <label for="contributor-email">Your government email*</label>
            <input
                id="contributor-email"
                name="contributor_email"
                class="input"
                :class="{'is-danger': errors.contributor_email}"
                type="email"
                placeholder="me@.gov.sg"
                v-model="form.contributor_email"
                required
            >
            <p class="help is-danger" v-if="errors.contributor_email">{{errors.contributor_email}}</p>
        </div>

        <div>
            <label for="term">Initialism/acronym*</label>
            <input
                id="term"
                name="term"
                class="input"
                :class="{'is-danger': errors.term}"
                type="text"
                placeholder="SGTS"
                v-model="form.term"
                required
            >
            <p class="help is-danger" v-if="errors.term">{{errors.term}}</p>
        </div>

        <div>
            <label for="full-term">Full term*</label>
            <input
                id="full-term"
                name="full_term"
                class="input"
                :class="{'is-danger': errors.full_term}"
                type="text"
                placeholder="Singapore Government Tech Stack"
                v-model="form.full_term"
                required
            >
            <p class="help is-danger" v-if="errors.full_term">{{errors.full_term}}</p>
        </div>

        <div>
            <label for="description">Short description*</label>
            <input
                id="description"
                name="description"
                class="input"
                :class="{'is-danger': errors.description}"
                type="text"
                placeholder="SGTS is ..."
                v-model="form.description"
                required
            >
            <p class="help is-danger" v-if="errors.description">{{errors.description}}</p>
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
                <p v-for="(category, index) of form.categories" :key="index + category">
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
                class="sgds-button"
                type="button"
                @click.prevent="addCategory(form.category)"
            >Add</button>
        </div>

        <div class="submit">
            <button
                class="sgds-button is-primary"
                :style="{minWidth: '100px'}"
                type="submit"
                :disabled="processingSubmission"
            >
                <template v-if="!processingSubmission">Submit</template>
                <template v-else>
                    <LoadingSpinner/>
                </template>
            </button>
        </div>
    </form>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import { urlEncode, emailRegex } from "./lib";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
    components: { LoadingSpinner },
    props: {
        type: {
            type: String,
            required: true,
            validator(value) {
                return ["add", "edit"].indexOf(value) !== -1;
            }
        },
        termId: {
            type: Number
        },
        term: {
            type: String
        },
        full_term: {
            type: String
        },
        description: {
            type: String
        },
        link: {
            type: String
        },
        categories: {
            type: Array
        }
    },
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
            },
            errors: {
                contributor: null,
                contributor_email: null,
                term: null,
                full_term: null,
                description: null,
                link: null,
                categories: null
            }
        };
    },
    methods: {
        raiseNoty() {
            new Noty({
                type: "success",
                text: "Here is a notification!"
            }).show();
        },
        addCategory(category) {
            this.form.categories.push(category);
        },
        handleSubmit() {
            let hasErrors = this.detectFormErrors();
            if (hasErrors) {
                return;
            }
            this.processingSubmission = true;
            let submission = {
                contributor: this.form.contributor,
                contributor_email: this.form.contributor_email,
                term: this.form.term,
                full_term: this.form.full_term,
                description: this.form.description,
                link: this.form.link,
                categories: this.form.categories
            };
            if (this.type === "edit") {
                submission = Object.assign({ id: this.termId }, submission);
            }

            let axiosConfig = {
                url: "/.netlify/functions/api/terms",
                data: submission
            };
            if (this.type === "add") {
                axiosConfig.method = "post";
            }
            if (this.type === "edit") {
                axiosConfig.method = "put";
            }
            axios(axiosConfig)
                .then(response => {
                    new Noty({
                        type: "success",
                        text: `Submission successful! You can view its approval progress <a href='${
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
                    this.$emit("close");
                });
        },
        detectFormErrors() {
            let hasErrors = false;
            [
                "contributor",
                "contributor_email",
                "term",
                "full_term",
                "description"
            ].forEach(field => {
                if (!this.form[field]) {
                    hasErrors = true;
                    this.errors[field] = "Please enter a valid value.";
                }
            });
            if (!emailRegex.test(this.form.contributor_email)) {
                hasErrors = true;
                this.errors.contributor_email =
                    "Please enter a valid government email.";
            }
            return hasErrors;
        },
        populateFormFromProps() {
            ["term", "full_term", "description", "link", "categories"].forEach(
                field => {
                    if (this[field]) {
                        this.form[field] = this[field];
                    }
                }
            );
        }
    },
    created() {
        if ((this.type === "edit")) {
            this.populateFormFromProps();
        }
    }
};
</script>

<style scoped>
.submit {
    display: flex;
    justify-content: center;
}
</style>
