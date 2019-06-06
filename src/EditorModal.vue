<template>
    <div class="modal-container">
        <div class="modal-header">
            <h6>Editing {{ page_title }}</h6>
            <button class="sgds-button is-rounded" type="button" @click="$emit('close')">
                <span class="sgds-icon sgds-icon-cross"></span>
            </button>
        </div>

        <div class="modal-body">
            <!-- Mount Quill Here -->
            <div id="editor"></div>

            <div class="row">
                <div class="col align-children-right">
                    <label for="email">Verify your government email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="me@gov.sg"
                        v-model="email"
                    >
                    <button
                        type="button"
                        class="sgds-button is-info"
                        @click="requestOtp"
                    >Send email OTP</button>
                </div>
            </div>

            <div class="row">
                <div class="col align-children-right">
                    <label for="otp">Enter your 6-digit OTP sent to your email</label>
                    <input type="number" name="otp" id="otp" v-model="otp">
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button
                type="button"
                class="modal-default-button sgds-button is-rounded is-primary"
                :disabled="!this.otp || this.otp.length < 6"
                @click="submit"
            >Submit Changes</button>
            <button
                type="button"
                class="modal-default-button sgds-button is-rounded margin--right"
                @click="$emit('close')"
            >Cancel</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Quill from "quill";
import { urlEncode } from "./lib";
export default {
    props: [
        "page_path",
        "page_title",
        "page_category",
        "page_content",
        "page_layout"
    ],
    data() {
        return {
            quill: null,
            form_name: "edit-form",
            email: null,
            otp: null
        };
    },
    methods: {
        requestOtp() {
            new Noty({
                type: "success",
                text: `An OTP has been sent to ${
                    this.email
                }. Please enter it before submitting your edits.`
            }).show();
        },
        submit() {
            const updatedContent = document.querySelector(".ql-editor").innerHTML
            const axiosConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            const dataToEncode = {
                page_path: this.page_path,
                page_title: this.page_title,
                page_category: this.page_category,
                page_content: updatedContent,
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
                ]
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

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    min-height: 40px;
}

.modal-default-button {
    float: right;
}

.align-children-right {
    display: flex;
    justify-content: flex-end;
}
</style>
