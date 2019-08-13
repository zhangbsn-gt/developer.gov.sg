<template>
    <div class="modal-container vld-parent">
        <Loading :active.sync="isLoading" :is-full-page="false"></Loading>
        <div class="modal-header">
            <h6>Editing {{ page_title }}</h6>
            <button class="sgds-button is-rounded" type="button" @click="$emit('close')">
                <span class="sgds-icon sgds-icon-cross"></span>
            </button>
        </div>
        <div class="modal-body">
            <small>URL: {{ page_path }}</small>
            <div class="sgds-tabs is-boxed">
                <ul>
                    <li :class="{'is-active': !showOriginal}">
                        <a @click.prevent="showOriginal = false" :style="{cursor: 'pointer'}">Editor</a>
                    </li>
                    <li :class="{'is-active': showOriginal}">
                        <a
                            @click.prevent="showOriginal = true"
                            :style="{cursor: 'pointer'}"
                        >Original</a>
                    </li>
                </ul>
            </div>
            <TextEditor :page_content="page_content" v-show="!showOriginal" />

            <div class="article original-content" v-show="showOriginal" v-html="page_content"></div>
        </div>

        <div class="modal-footer">
            <VerifyAndSubmit @submit="submitChanges" @loading="updateLoadingState" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VerifyAndSubmit from "../lib/VerifyAndSubmit.vue";
import TextEditor from "../lib/TextEditor.vue";

export default {
    components: { VerifyAndSubmit, Loading, TextEditor },
    props: {
        page_title: {
            type: String,
            required: true
        },
        page_layout: {
            type: String,
            required: true
        },
        page_category: {
            type: String,
            required: true
        },
        page_description: {
            type: String
        },
        page_path: {
            type: String,
            required: true
        },
        page_content: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            quill: null,
            showOriginal: false,
            isLoading: false,
            imageSrc: ""
        };
    },
    methods: {
        submitChanges({ email, otp, otpRequestId }) {
            const updatedContent = document.querySelector(".ql-editor")
                .innerHTML;
            this.isLoading = true;
            axios
                .post("/.netlify/functions/api/submit-article-changes", {
                    page_title: this.page_title,
                    page_layout: this.page_layout,
                    page_category: this.page_category,
                    page_description: this.page_description,
                    page_path: this.page_path,
                    page_content: updatedContent,
                    email,
                    otp,
                    otpRequestId
                })
                .then(response => {
                    let prLink = response.data.pr;
                    new Noty({
                        type: "success",
                        text: `Your contribution has been submitted! <a href='${prLink}'>View its progress here</a>`
                    }).show();
                    this.$emit("close");
                })
                .catch(err => {
                    let message = "";
                    if (err.response && err.response.data) {
                        message = err.response.data.error;
                    }
                    new Noty({
                        type: "error",
                        text: `There was an error submitting your changes. ${message}`
                    }).show();
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        updateLoadingState(isLoading) {
            this.isLoading = isLoading;
        }
    }
};
</script>
