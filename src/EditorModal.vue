<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h5>Editing {{ page_title }}</h5>
                </div>

                <div class="modal-body">
                    <div id="editor">
                        <span v-html="initial_content"></span>
                    </div>
                </div>

                <div class="modal-footer">
                    <form
                        id="edit-form"
                        name="edit-form"
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot="honeypot-field"
                    >
                        <!-- Spam guard -->
                        <input type="hidden" name="honeypot-field" value="edit-form">
                        <button
                            type="submit"
                            class="modal-default-button sgds-button is-rounded is-primary"
                            @click.prevent="submit"
                        >Send for Review</button>
                        <button
                            type="button"
                            class="modal-default-button sgds-button is-rounded margin--right"
                            @click="$emit('close')"
                        >Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { urlEncode } from "./lib";
export default {
    props: [
        "page_path",
        "page_title",
        "page_category",
        "page_layout",
        "initial_content"
    ],
    data() {
        return {
            form_name: "edit-form"
        };
    },
    methods: {
        submit() {
            const axiosConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            this.page_content = document.querySelector(".ql-editor").innerHTML;
            const dataToEncode = {
                page_path: this.page_path,
                page_title: this.page_title,
                page_category: this.page_category,
                page_content: this.page_content,
                page_layout: this.page_layout,
                form_name: this.form_name
            };
            dataToEncode["form-name"] = this.form_name;
            axios
                .post("/", urlEncode(dataToEncode), axiosConfig)
                .then(response => {
                    new Noty({
                        type: "success",
                        layout: "bottomRight",
                        text:
                            "Your contribution has been submitted! <a href='https://github.com/GovTechSG/developer.gov.sg/pulls'>View its progress here</a>"
                    }).show();
                    this.$emit("form-submit-success");
                })
                .catch(function(error) {
                    new Noty({
                        type: "error",
                        layout: "bottomRight",
                        text:
                            "There was an error processing your request. Please try again."
                    }).show();
                });
        }
    },
    mounted() {
        this.editor = new Quill("#editor", {
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
                ]
            }
        });
    }
};
</script>

<style>
/* no scoped css. styles apply .article, outside this component */
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 70%;
    margin: 0px auto;
    padding: 60px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #888888;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*Custom styling for editable page*/
/* .article applies to outer html*/
.ql-editor {
    font-family: "Source Sans Pro", BlinkMacSystemFont, -apple-system,
        "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    overflow: scroll;
    min-height: 60vh;
    max-height: 60vh;
}

.ql-editor h5,
.article h5 {
    font-size: 2rem !important;
    font-weight: 600 !important;
    margin-bottom: 1rem !important;
}

.ql-editor h6,
.article h6 {
    font-size: 1.5rem !important;
    font-weight: 600 !important;
    margin-bottom: 1rem !important;
}

.ql-editor h5:nth-child(n + 2),
.article h5:nth-child(n + 2) {
    border-top: 1px solid #d6d6d6;
    padding-top: 2rem !important;
    margin-top: 2rem !important;
}

.ql-editor p,
.article p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

hr {
    margin-bottom: 2rem !important;
    margin-top: 2rem !important;
}
</style>
