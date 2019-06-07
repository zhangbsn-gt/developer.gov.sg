<template>
    <div class="sgds-card">
        <form
            name="contribute-terms-form"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="honeypot-field"
            @submit.prevent="handleSubmit"
        >
            <div class="sgds-card-content">
                <p>Have an initialism/acronym to contribute? Suggest them to us here!</p>

                <p>
                    <label for="contribute-terms-contributor">Your name*</label>
                    <input
                        id="contribute-terms-contributor"
                        name="contributor"
                        class="input"
                        type="text"
                        placeholder="Richard Yang"
                        v-model="form.contributor"
                        required
                    >
                </p>

                <p>
                    <label for="contribute-terms-contributor-email">Your government email*</label>
                    <input
                        id="contribute-terms-contributor-email"
                        name="contributor_email"
                        class="input"
                        type="email"
                        placeholder="richard_yang@tech.gov.sg"
                        v-model="form.contributor_email"
                        required
                    >
                </p>

                <p>
                    <label for="contribute-terms-term">Initialism/acronym*</label>
                    <input
                        id="contribute-terms-term"
                        name="term"
                        class="input"
                        type="text"
                        placeholder="SGTS"
                        v-model="form.term"
                        required
                    >
                </p>

                <p>
                    <label for="contribute-terms-full-term">Full term*</label>
                    <input
                        id="contribute-terms-full-term"
                        name="full_term"
                        class="input"
                        type="text"
                        placeholder="Singapore Government Tech Stack"
                        v-model="form.full_term"
                        required
                    >
                </p>

                <p>
                    <label for="contribute-terms-description">Short description*</label>
                    <input
                        id="contribute-terms-description"
                        name="description"
                        class="input"
                        type="text"
                        placeholder="SGTS is ..."
                        v-model="form.description"
                        required
                    >
                </p>

                <p>
                    <label for="contribute-terms-link">Links/URLs</label>
                    <input
                        id="contribute-terms-link"
                        name="link"
                        class="input"
                        type="text"
                        placeholder="https://tech.gov.sg"
                        v-model="form.link"
                    >
                </p>

                <p>
                    <label for="contribute-terms-category">Category</label>
                    <input
                        id="contribute-terms-category"
                        name="category"
                        class="input"
                        type="text"
                        placeholder="platform, data"
                        v-model="form.category"
                    >
                </p>
                <input type="hidden" name="honeypot-field">
            </div>
            <div class="sgds-card-footer">
                <div class="sgds-card-footer-item">
                    <span>
                        <button class="sgds-button default" type="submit">Submit</button>
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

export default {
    data: function() {
        return {
            form: {} // See template for all fields
        };
    },
    methods: {
        handleSubmit() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };
            const dataToEncode = this.form;
            dataToEncode["form-name"] = "contribute-terms-form"; // check template
            axios
                .post("/", urlEncode(dataToEncode), axiosConfig)
                .then(response => {
                    new Noty({
                        type: "success",
                        text:
                            "Your contribution has been submitted! <a href>View its progress here</a>"
                    }).show();
                    this.$emit("form-submit-success");
                })
                .catch(error => {
                    new Noty({
                        type: "error",
                        text:
                            "There was an error processing your request. Please try again."
                    }).show();
                });
        }
    }
};
</script>
