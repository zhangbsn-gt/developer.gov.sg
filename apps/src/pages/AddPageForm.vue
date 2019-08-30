<template>
  <form @submit.prevent="handleSubmit" class="vld-parent">
    <Loading :active.sync="isLoading" :is-full-page="false"></Loading>

    <div class="row">
      <div class="col">
        <label for="title" class="has-text-weight-semibold">Title</label>
        <input
          id="title"
          name="title"
          class="input"
          type="text"
          v-model="form.title"
        />
        <p class="help is-danger" v-if="errors.title">{{ errors.title }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="description" class="has-text-weight-semibold"
          >Description</label
        >
        <input
          id="description"
          name="description"
          class="input"
          type="text"
          placeholder="This product is..."
          v-model="form.description"
        />
        <p class="help is-danger" v-if="errors.description">
          {{ errors.description }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="category" class="has-text-weight-semibold">
          Category
          <br />
          <small
            >Choose from a list of existing categories, or enter the name of a
            new one.</small
          >
        </label>

        <input
          id="category"
          name="category"
          class="input"
          type="text"
          v-model="form.category"
          list="categorynames"
        />
        <datalist id="categorynames">
          <option
            v-for="category in page_categories"
            :key="category"
            :value="category"
          ></option>
        </datalist>
        <p class="help is-danger" v-if="errors.category">
          {{ errors.category }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col is-12">
        <label class="has-text-weight-semibold">Page Content</label>
        <TextEditor style="height: 500px" />
      </div>
    </div>

    <VerifyAndSubmit @submit="submitChanges" @loading="updateLoadingState" />
  </form>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { urlRegex, sanitize } from "../lib";
import VerifyAndSubmit from "../lib/VerifyAndSubmit.vue";
import TextEditor from "../lib/TextEditor.vue";

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  components: { VerifyAndSubmit, Loading, TextEditor },
  data() {
    return {
      quill: null,
      isLoading: false,
      page_type: "",
      page_categories: "",
      form: {
        title: "",
        category: "",
        description: ""
      },
      errors: {
        title: "",
        category: "",
        description: ""
      }
    };
  },
  methods: {
    detectFormErrors() {
      let hasErrors = false;
      Object.keys(this.form).forEach(field => {
        if (!this.form[field]) {
          hasErrors = true;
          this.errors[field] = "Please enter a valid value.";
        }
      });
      return hasErrors;
    },
    submitChanges({ email, otp, otpRequestId }) {
      let hasErrors = this.detectFormErrors();
      if (hasErrors) {
        return;
      }
      const pageContent = document.querySelector(".ql-editor").innerHTML;
      this.isLoading = true;

      axios
        .post("/.netlify/functions/api/request-new-page", {
          page_type: this.page_type,
          page_title: this.form.title,
          page_category: this.form.category,
          page_description: this.form.description,
          page_content: sanitize(pageContent),
          email,
          otp,
          otpRequestId
        })
        .then(response => {
          let prLink = response.data.pr;
          new Noty({
            type: "success",
            text: `Your new page request ${this.form.title} has been submitted! <a href='${prLink}'>View its approval progress here</a>`
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
  },
  created() {
    this.page_type = this.type;
    this.page_categories = this.categories;
  }
};
</script>
