<template>
    <div class="modal-container">
        <div class="modal-header">
            <h5>Editing {{ page_title }}</h5>
            <button class="sgds-button is-rounded" type="button" @click="$emit('close')">
                <span class="sgds-icon sgds-icon-cross"></span>
            </button>
        </div>

        <div class="modal-body">
            <div class="sgds-tabs">
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
            <div id="editor-wrapper" v-show="!showOriginal">
                <!-- Mount Quill Here -->
                <div id="editor"></div>
            </div>

            <div class="article original-content" v-show="showOriginal" v-html="page_content"></div>
        </div>

        <div class="modal-footer">
            <VerifyAndSubmit @submit="submitChanges"/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Quill from "quill";
import VerifyAndSubmit from "./VerifyAndSubmit.vue";

export default {
    components: { VerifyAndSubmit },
    props: {
        page_path: {
            type: String,
            required: true
        },
        page_title: {
            type: String,
            required: true
        },
        page_category: {
            type: String,
            required: true
        },
        page_content: {
            type: String,
            required: true
        },
        page_layout: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            quill: null,
            showOriginal: false
        };
    },
    methods: {
        submitChanges({ email, otp }) {
            const updatedContent = document.querySelector(".ql-editor")
                .innerHTML;
            axios
                .post("/.netlify/functions/api/submit-article-changes", {
                    page_path: this.page_path,
                    page_title: this.page_title,
                    page_category: this.page_category,
                    page_content: updatedContent,
                    page_layout: this.page_layout,
                    email,
                    otp
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
                });
        }
    },
    mounted() {
        this.quill = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: [
                    [
                        {
                            header: [5, 6, false]
                        }
                    ],
                    ["bold", "italic", "underline", "link"],
                    ["blockquote", "code-block"],
                    [
                        {
                            list: "ordered"
                        },
                        {
                            list: "bullet"
                        }
                    ],
                    ["clean"]
                    // [{ header: 1 }, { header: 2 }], // custom button values
                    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    // [{ direction: "rtl" }], // text direction
                    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    // [{ font: [] }],
                    // [{ align: [] }],
                ],
                clipboard: {
                    matchVisual: false // Stop quill from auto-adding <br> blocks before headers
                }
            }
        });
        this.quill.clipboard.dangerouslyPasteHTML(this.page_content);
    }
};
</script>

<style scoped>
.modal-container {
    padding: 15px 30px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
}

.modal-body,
.modal-footer {
    margin: 20px 0;
}

.modal-footer-buttons {
    margin-top: 12px;
}

.modal-default-button {
    float: right;
}

.bold {
    font-weight: bold;
}

.justified {
    display: flex;
    justify-content: space-between;
}

.align-children-right {
    display: flex;
    justify-content: flex-end;
}

.original-content {
    border: 1px solid #d6d6d6;
    overflow: scroll;
}
</style>
