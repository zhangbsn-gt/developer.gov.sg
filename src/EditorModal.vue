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

            <div id="original-content" class="article" v-show="showOriginal" v-html="page_content"></div>
        </div>

        <div class="modal-footer">
            <div class="row">
                <div class="col">
                    <h6>Submit contributions</h6>
                    <span :class="verifyStageStyles">verify government email</span>
                    &bull;
                    <span :class="submitStageStyles">submit changes</span>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div v-if="stage === 'verify'">
                        <form>
                            <label for="email">Verify your government email</label>
                            <input
                                type="email"
                                class="input"
                                id="email"
                                name="email"
                                placeholder="me@gov.sg"
                                v-model="email"
                            >
                            <p class="modal-footer-buttons">
                                <button
                                    type="submit"
                                    class="sgds-button is-info"
                                    @click.prevent="requestOtp"
                                    :disabled="!emailRegex.test(email)"
                                >Send email OTP</button>
                            </p>
                        </form>
                    </div>

                    <div v-if="stage === 'submit'">
                        <form>
                            <label for="otp">Enter your 6-digit OTP sent to your email at {{ email }}</label>
                            <input type="number" name="otp" id="otp" class="input" v-model="otp">

                            <p class="modal-footer-buttons">
                                <button
                                    type="button"
                                    class="sgds-button"
                                    @click.prevent="stage = 'verify'"
                                >Back</button>
                                <button
                                    type="submit"
                                    class="sgds-button is-primary"
                                    :disabled="!this.otp || this.otp.length < 6"
                                    @click.prevent="submit"
                                >Submit Changes</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Quill from "quill";
import { urlEncode, emailRegex } from "./lib";
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
            showOriginal: false,
            form_name: "edit-form",
            email: null,
            otp: null,
            stage: "verify",
            emailRegex
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
            this.stage = "submit";
        },
        submit() {
            const updatedContent = document.querySelector(".ql-editor")
                .innerHTML;
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
                        text:
                            "Your contribution has been submitted! <a href='https://github.com/GovTechSG/developer.gov.sg/pulls'>View its progress here</a>"
                    }).show();
                    this.showEditorModal = false;
                })
                .catch(error => {
                    new Noty({
                        type: "error",
                        text:
                            "There was an error processing your request. Please try again."
                    }).show();
                });
        }
    },
    computed: {
        verifyStageStyles() {
            return {
                bold: "verify" === this.stage
            };
        },
        submitStageStyles() {
            return {
                bold: "submit" === this.stage
            };
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

#original-content {
    overflow: scroll;
    max-height: 60vh;
}
</style>
