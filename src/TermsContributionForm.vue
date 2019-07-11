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
                    @blur="validateInput('term')"
                />
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
                    @blur="validateInput('full_term')"
                />
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
                    @blur="validateInput('description')"
                />
                <p class="help is-danger" v-if="errors.description">{{errors.description}}</p>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <label for="tag" class="has-text-weight-semibold">Tags</label>
                <input
                    id="tag"
                    name="tag"
                    class="input"
                    :class="{'is-danger': errors.tag}"
                    type="text"
                    placeholder="platform"
                    v-model="form.tag"
                    ref="tagInput"
                    @blur="validateInput('tag')"
                />
                <p class="help is-danger" v-if="errors.tag">{{errors.tag}}</p>
                <button
                    class="sgds-button margin--top--sm"
                    type="button"
                    @click.prevent="addTag"
                >Add a tag</button>
                <div>
                    <button
                        type="button"
                        disabled
                        class="sgds-button is-rounded"
                        v-for="(tag, index) of form.tags"
                        :key="index + tag"
                    >
                        {{tag}}
                        <span
                            class="sgds-icon sgds-icon-cross"
                            @click="form.tags.splice(index, 1)"
                            :style="{cursor: 'pointer'}"
                        ></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <label for="link" class="has-text-weight-semibold">Links</label>
                <input
                    id="link"
                    name="link"
                    class="input"
                    :class="{'is-danger': errors.link}"
                    type="text"
                    placeholder="https://tech.gov.sg"
                    v-model="form.link"
                    ref="linkInput"
                    @blur="validateInput('link')"
                />
                <p class="help is-danger" v-if="errors.link">{{errors.link}}</p>
                <button
                    class="sgds-button margin--top--sm"
                    type="button"
                    @click.prevent="addLink"
                >Add a link</button>
                <div>
                    <button
                        type="button"
                        disabled
                        class="sgds-button is-rounded"
                        v-for="(link, index) of form.links"
                        :key="index + link"
                    >
                        {{link}}
                        <span
                            class="sgds-icon sgds-icon-cross"
                            @click="form.links.splice(index, 1)"
                            :style="{cursor: 'pointer'}"
                        ></span>
                    </button>
                </div>
            </div>
        </div>

        <VerifyAndSubmit @validate="detectFormErrors" @submit="submit" />
    </form>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import { urlRegex } from "./lib";
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
            type: String
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
        tags: {
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
                tag: null,
                tags: []
            },
            errors: {
                term: null,
                full_term: null,
                description: null,
                tag: null,
                link: null
            }
        };
    },
    methods: {
        submit({ email, otp, otpRequestId }) {
            let hasErrors = this.detectFormErrors();
            if (hasErrors) {
                return;
            }
            this.processingSubmission = true;
            let submission = {
                term: this.form.term,
                full_term: this.form.full_term,
                description: this.form.description,
                links: this.form.links,
                tags: this.form.tags,
                email,
                otp,
                otpRequestId
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
                        text: `Submission successful! You can view its approval progress <a href='${response.data.pr}'>here.</a>`
                    }).show();
                    this.$emit("close");
                })
                .catch(err => {
                    let message = err.message || err;
                    if (err.response && err.response.data) {
                        message = err.response.data.error;
                    }
                    new Noty({
                        type: "error",
                        text: `An error has occurred: ${message}`
                    }).show();
                })
                .finally(() => {
                    this.processingSubmission = false;
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
        /**
         * Removes error message on input if validation passes
         */
        validateInput(field) {
            if (
                (this.form[field] && this.errors[field]) ||
                field === "link" ||
                field === "tag"
            ) {
                this.errors[field] = null;
            }
        },
        populateFormFromProps() {
            ["term", "full_term", "description"].forEach(field => {
                if (this[field]) {
                    this.form[field] = this[field];
                }
            });
            if (this.links) {
                this.form.links = [...this.links];
            }
            if (this.tags) {
                this.form.tags = [...this.tags];
            }
        },
        addTag() {
            if (!this.form.tag) {
                this.errors.tag = "Please enter a valid tag.";
                this.$refs.tagInput.focus();
                return;
            }

            let tag = this.form.tag.toLowerCase();
            if (this.form.tags.indexOf(tag) !== -1) {
                this.errors.tag = "This tag already exists.";
                this.$refs.tagInput.focus();
                return;
            }

            this.form.tags.push(tag);
            this.form.tag = null;
        },
        addLink() {
            if (!this.form.link) {
                this.errors.link = "Please enter a valid link.";
                this.$refs.linkInput.focus();
                return;
            }

            if (!urlRegex.test(this.form.link)) {
                this.errors.link = "Please enter a valid URL.";
                this.$refs.linkInput.focus();
                return;
            }

            let link = this.form.link.toLowerCase();
            if (this.form.links.indexOf(link) !== -1) {
                this.errors.link = "This link already exists.";
                this.$refs.linkInput.focus();
                return;
            }

            this.form.links.push(link);
            this.form.link = null;
        }
    },
    created() {
        if (this.type === "edit") {
            this.populateFormFromProps();
        }
    }
};
</script>

<style scoped>
.form-list {
    display: flex;
    justify-content: space-between;
}
</style>
