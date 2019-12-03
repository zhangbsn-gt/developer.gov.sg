<template>
  <form class="vld-parent">
    <Loading :active.sync="isLoading" :is-full-page="false"></Loading>

    <div class="field">
      <label for="title" class="label">Title</label>
      <div class="control">
        <input
          id="title"
          name="title"
          class="input"
          type="text"
          v-model="form.title"
          @blur="validateForm"
        />
      </div>
      <p class="help is-danger" v-if="errors.title">
        {{ errors.title }}
      </p>
    </div>
    <div class="field">
      <label for="description" class="label">
        Description
        <br />
        <small>This text appears on links to your page</small>
      </label>
      <div class="control">
        <input
          id="description"
          name="description"
          class="input"
          type="text"
          placeholder="This product is..."
          v-model="form.description"
          @blur="validateForm"
        />
      </div>
      <p class="help is-danger" v-if="errors.description">
        {{ errors.description }}
      </p>
    </div>
    <div class="field">
      <label for="category" class="label">
        Category
        <br />
        <small>
          Choose from a list of existing categories, or enter the name of a new
          one.
        </small>
      </label>

      <input
        id="category"
        name="category"
        class="input"
        type="text"
        v-model="form.category"
        list="categorynames"
        @blur="validateForm"
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

    <label class="label">Page Content</label>
    <div class="control">
      <TextEditor>
        <template v-slot:editor-footer="{ editor }">
          <div class="article-editor-footer">
            <VerifyAndSubmit
              :validateForm="validateForm"
              @submit="submitChanges($event, editor.getHTML())"
              @loading="updateLoadingState"
            />
          </div>
        </template>
      </TextEditor>
    </div>
  </form>
</template>

<script>
import Noty from "noty";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  urlRegex,
  sanitize,
  apiClient,
  detectFormErrors,
  hasErrors
} from "../lib";
import VerifyAndSubmit from "../lib/VerifyAndSubmit.vue";
import TextEditor from "../lib/TextEditor.vue";

export default {
  props: {
    collection: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  components: { VerifyAndSubmit, Loading, TextEditor },
  created() {
    this.page_collection = this.collection;
    this.page_categories = this.categories;
  },
  data() {
    return {
      quill: null,
      isLoading: false,
      page_collection: "",
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
    validateForm() {
      let errors = detectFormErrors({
        form: { ...this.form }
      });
      Object.assign(this.errors, errors);
      return !hasErrors(errors);
    },
    submitChanges({ email, otp, otpRequestId }, pageContent) {
      let formValid = this.validateForm();
      if (!formValid) {
        return;
      }
      this.isLoading = true;

      apiClient
        .post("/request-new-page", {
          page_title: this.form.title,
          page_category: this.form.category,
          page_description: this.form.description,
          page_collection: this.page_collection,
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
  }
};
</script>
