<template>
    <div id="edit-product-app">
        <a class="sgds-button is-rounded" @click="openEditor">Edit This Page</a>
        <EditorModal
            :key="stages.edit"
            v-if="showEditStageModal"
            :onMount="mountQuillEditor"
            @close-modal="closeEditor"
        >
            <template v-slot:modal-header>
                <h5>{{ title }}</h5>
            </template>

            <template v-slot:modal-body>
                <div id="editor">
                    <span v-html="page_content"></span>
                </div>
            </template>

            <template v-slot:modal-footer>
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
                        @click.prevent="toSubmitStage"
                    >Verify Government Email</button>
                    <button
                        type="button"
                        class="modal-default-button sgds-button is-rounded margin--right"
                        @click="closeEditor"
                    >Cancel</button>
                </form>
            </template>
        </EditorModal>

        <EditorModal v-if="showSubmitStageModal" @close-modal="closeEditor" :key="stages.submit">
            <template v-slot:modal-header>Submit changes</template>

            <template v-slot:modal-body>
                Enter email and OTP
                (preview changes)
            </template>

            <template v-slot:modal-footer>
                <button
                    type="button"
                    class="modal-default-button sgds-button is-rounded"
                    @click="toEditStage"
                >Back</button>
            </template>
        </EditorModal>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Quill from "quill";
import EditorModal from "./EditorModal.vue";
import { urlEncode } from "./lib";

const stages = { edit: "edit", submit: "submit" };
const data = {
    showEditorModal: false,
    content: "",
    stages,
    currentStage: stages.edit,
    form_name: "edit-form"
};

export default {
    props: ["title", "permalink", "category", "layout"],
    components: { EditorModal },
    data() {
        return data;
    },
    created() {
        this.page_content = document.getElementsByClassName(
            "article"
        )[0].innerHTML;
    },
    methods: {
        openEditor() {
            this.showEditorModal = true;
        },
        closeEditor() {
            this.showEditorModal = false;
        },
        submit() {
            const axiosConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            this.page_content = document.querySelector(".ql-editor").innerHTML;
            const dataToEncode = {
                page_path: this.permalink,
                page_title: this.title,
                page_category: this.category,
                page_content: this.page_content,
                page_layout: this.layout,
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
                    this.showEditorModal = false;
                })
                .catch(error => {
                    new Noty({
                        type: "error",
                        layout: "bottomRight",
                        text:
                            "There was an error processing your request. Please try again."
                    }).show();
                });
        },
        mountQuillEditor() {
            new Quill("#editor", {
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
        },
        toSubmitStage() {
            this.page_content = document.querySelector(".ql-editor").innerHTML;
            this.currentStage = this.stages.submit;
        },
        toEditStage() {
            this.currentStage = this.stages.edit;
        }
    },
    computed: {
        showEditStageModal() {
            return (
                this.showEditorModal && this.currentStage === this.stages.edit
            );
        },
        showSubmitStageModal() {
            return (
                this.showEditorModal && this.currentStage === this.stages.submit
            );
        }
    }
};
</script>

<style>
/* .modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
} */

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
