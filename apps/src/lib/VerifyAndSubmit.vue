<template>
  <div class="verify-and-submit">
    <h6>Submit</h6>
    <div v-if="stage === stages.verify">
      <form>
        <label for="contributor-email"
          >Please enter your government email for verification</label
        >
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              id="contributor-email"
              name="email"
              class="input"
              :class="{ 'is-danger': errors.email }"
              type="email"
              placeholder="me@.gov.sg"
              v-model="email"
              @blur="validateEmail"
              required
            />
          </div>
          <div class="control">
            <button
              type="submit"
              class="sgds-button is-primary"
              @click.prevent="requestOtp"
              :disabled="!emailRegex.test(email)"
            >
              Send OTP
            </button>
          </div>
        </div>
        <p class="help is-danger" v-if="errors.email">{{ errors.email }}</p>
      </form>
    </div>

    <div v-if="stage === stages.submit">
      <form>
        <label for="otp"
          >Please enter the OTP sent to your email at {{ email }}</label
        >
        <div class="field has-addons">
          <div class="control">
            <button class="sgds-button" disabled>{{ otpRequestId }}-</button>
          </div>
          <div class="control is-expanded">
            <input
              type="text"
              name="otp"
              id="otp"
              class="input"
              :class="{ 'is-danger': errors.otp }"
              v-model="otp"
              required
            />
          </div>
          <div class="control is-flex">
            <button
              type="button"
              class="sgds-button"
              @click.prevent="stage = stages.verify"
            >
              <i class="material-icons">
                undo
              </i>
            </button>
            <button
              type="submit"
              class="sgds-button is-primary"
              :disabled="!otpIsValid"
              @click.prevent="submit"
            >
              Submit Changes
            </button>
          </div>
        </div>
        <p class="help is-danger" v-if="errors.otp">{{ errors.otp }}</p>
      </form>
    </div>

    <small>
      You will be able to track submission status at our GitHub repository's
      <a href="https://github.com/govtechsg/developer.gov.sg/pulls"
        >pull requests</a
      >
    </small>
  </div>
</template>

<script>
import Noty from "noty";
import { emailRegex, otpRegex, apiClient } from "./index";

const stages = {
  verify: "verify",
  submit: "submit"
};

export default {
  props: {
    validateForm: Function
  },
  data() {
    return {
      emailRegex,
      stages,
      stage: stages.verify,
      email: null,
      otp: "",
      otpRequestId: "",
      errors: {
        email: null,
        otp: null
      }
    };
  },
  methods: {
    validateEmail() {
      if (!this.email || !emailRegex.test(this.email)) {
        this.errors.email = "Please enter a valid government email";
        return false;
      }
      this.errors.email = null;
      return true;
    },
    requestOtp() {
      if (this.validateForm && !this.validateForm()) {
        return;
      }
      this.$emit("validate"); // Inform outer form to perform validation
      if (!this.validateEmail()) {
        return;
      }
      this.$emit("loading", true);
      apiClient
        .post("/request-otp", {
          email: this.email
        })
        .then(response => {
          new Noty({
            type: "success",
            text: `An OTP has been sent to ${this.email}. Please enter it before submitting your edits.`
          }).show();
          let otpRequestId = response.data.id;
          this.otpRequestId = otpRequestId;
          this.stage = stages.submit;
        })
        .catch(error => {
          new Noty({
            type: "error",
            text: `An error has occurred: ${error.message || error}`
          }).show();
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },
    submit() {
      if (!this.otpIsValid) {
        this.errors.otp = "Please a valid 6-digit OTP.";
        return;
      }
      if (!this.otpRequestId) {
        new Noty({
          type: "error",
          text: `Could not send submission; have you requested for your OTP?`
        }).show();
        return;
      }
      this.$emit("submit", {
        email: this.email,
        otp: this.otp,
        otpRequestId: this.otpRequestId
      });
      this.otp = "";
      this.otpRequestId = "";
      this.stage = stages.verify;
    }
  },
  computed: {
    otpIsValid() {
      return this.otp.search(otpRegex) !== -1;
    }
  }
};
</script>

<style scoped>
.verify-and-submit {
  margin-top: 1rem;
}
</style>
