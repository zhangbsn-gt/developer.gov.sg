<template>
    <form @submit.prevent="handleSubmit">
        <div class="row">
            <div class="col">
                <label for="term" class="has-text-weight-semibold">Acronym*</label>
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
        </div>

        <div class="row">
            <div class="col">
                <label for="full-term" class="has-text-weight-semibold">What it stands for*</label>
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
        </div>

        <div class="row">
            <div class="col">
                <label for="description" class="has-text-weight-semibold">Short description*</label>
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
        </div>

        <div class="row">
            <div class="col">
                <label for="category" class="has-text-weight-semibold">Tags</label>
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
                        id="category"
                        name="category"
                        class="input"
                        type="text"
                        placeholder="platform"
                        v-model="form.category"
                >
                <button
                        class="sgds-button is-rounded margin--top--sm"
                        type="button"
                        @click.prevent="form.categories.push(form.category);"
                >Add another Category</button>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <label for="link" class="has-text-weight-semibold">URLs</label>
                <div>
                    <p v-for="(link, index) of form.links" :key="index + link">
                        {{ link }}
                        <span
                                class="sgds-icon sgds-icon-cross"
                                @click="form.links.splice(index, 1)"
                                :style="{cursor: 'pointer'}"
                        ></span>
                    </p>
                </div>
                <input
                        id="link"
                        name="link"
                        class="input"
                        type="text"
                        placeholder="https://tech.gov.sg"
                        v-model="form.link"
                >
                <button
                        class="sgds-button is-rounded margin--top--sm"
                        type="button"
                        @click.prevent="form.links.push(form.link)"
                >Add another Link</button>
            </div>
        </div>

        <VerifyAndSubmit @submit="submit"/>
    </form>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import { urlEncode } from "./lib";
import VerifyAndSubmit from "./VerifyAndSubmit.vue";

export default {
    components: { VerifyAndSubmit },
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
        links: {
            type: Array
        },
        categories: {
            type: Array
        }
    },
    data: function() {
        return {
            processingSubmission: false,
            form: {
                term: null,
                full_term: null,
                description: null,
                link: null,
                links: [],
                category: null,
                categories: []
            },
            errors: {
                term: null,
                full_term: null,
                description: null
            }
        };
    },
    methods: {
        submit({ email, otp }) {
            let hasErrors = this.detectFormErrors();
            if (hasErrors) {
                return;
            }
            this.processingSubmission = true;
            let submission = {
                email,
                otp,
                term: this.form.term,
                full_term: this.form.full_term,
                description: this.form.description,
                links: this.form.links,
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
                .catch(err => {
                    let message = err.message || err;
                    if (err.response && err.response.data) {
                        message = err.response.data.error
                    }
                    new Noty({
                        type: "error",
                        text: `An error has occurred: ${message}`
                    }).show();
                })
                .finally(() => {
                    this.processingSubmission = false;
                    this.$emit("close");
                });
        },
        detectFormErrors() {
            let hasErrors = false;
            ["term", "full_term", "description"].forEach(field => {
                if (!this.form[field]) {
                    hasErrors = true;
                    this.errors[field] = "Please enter a valid value.";
                }
            });
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
        if (this.type === "edit") {
            this.populateFormFromProps();
        }
        if (this.links) {
            this.form.links = [...this.links];
        }
        if (this.categories) {
            this.form.categories = [...this.categories];
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
