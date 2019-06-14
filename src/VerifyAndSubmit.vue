<template>
    <div class="verify-and-submit">
        <div class="row">
            <div class="col">
                <h6>Submit your contributions</h6>
                <span :class="{bold: stage === stages.verify}">verify government email</span>
                &bull;
                <span :class="{bold: stage === stages.submit}">submit changes</span>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div v-if="stage === stages.verify">
                    <form>
                        <label for="contributor-email">Verify you government email*</label>
                        <input
                            id="contributor-email"
                            name="email"
                            class="input"
                            :class="{'is-danger': errors.email}"
                            type="email"
                            placeholder="me@.gov.sg"
                            v-model="email"
                            required
                        >
                        <p class="help is-danger" v-if="errors.email">{{errors.email}}</p>
                        <p>
                            <button
                                type="submit"
                                class="sgds-button is-info"
                                @click.prevent="requestOtp"
                                :disabled="!emailRegex.test(email)"
                            >Send email OTP</button>
                        </p>
                    </form>
                </div>

                <div v-if="stage === stages.submit">
                    <form>
                        <label for="otp">Enter your 6-digit OTP sent to your email at {{ email }}</label>
                        <input
                            type="number"
                            name="otp"
                            id="otp"
                            class="input"
                            :class="{'is-danger': errors.otp}"
                            v-model="otp"
                            required
                        >

                        <p class="modal-footer-buttons">
                            <button
                                type="button"
                                class="sgds-button"
                                @click.prevent="stage = stages.verify"
                            >Back</button>
                            <button
                                type="submit"
                                class="sgds-button is-primary"
                                :disabled="!this.otp || this.otp.length !== 6"
                                @click.prevent="submit"
                            >Submit Changes</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import { emailRegex } from "./lib";

const stages = {
    verify: "verify",
    submit: "submit"
};

export default {
    data() {
        return {
            emailRegex,
            stages,
            stage: stages.verify,
            email: null,
            otp: null,
            errors: {
                email: null,
                otp: null,
            }
        };
    },
    methods: {
        requestOtp() {
            if (!this.email || !emailRegex.test(this.email)) {
                this.errors.email = "Please enter a valid government email";
                return;
            }
            axios
                .post("/.netlify/functions/api/request-otp", {
                    email: this.email
                })
                .then(() => {
                    new Noty({
                        type: "success",
                        text: `An OTP has been sent to ${
                            this.email
                        }. Please enter it before submitting your edits.`
                    }).show();
                    this.stage = stages.submit;
                })
                .catch(error => {
                    new Noty({
                        type: "error",
                        text: `An error has occurred: ${error.message || error}`
                    }).show();
                });
        },
        submit() {
            if (!this.otp || this.otp.length !== 6) {
                this.errors.otp = "Please a valid 6-digit OTP."
                return;
            }
            this.$emit("submit", {
                email: this.email,
                otp: this.otp
            });
        }
    }
};
</script>

<style scoped>
.bold {
    font-weight: bold;
}
</style>
