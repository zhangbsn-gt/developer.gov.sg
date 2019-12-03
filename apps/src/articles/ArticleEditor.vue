<template>
  <div class="article-editor-container vld-parent">
    <Loading :active.sync="isLoading" :is-full-page="false"></Loading>
    <div class="article-editor-body">
      <div class="field">
        <div class="field-header">
          <label class="label" for="title">Title</label>
          <label class="checkbox">
            edit
            <input type="checkbox" v-model="edit.title" />
          </label>
        </div>
        <div class="control">
          <input
            class="input"
            type="text"
            id="title"
            v-model="page.title"
            :disabled="!edit.title"
          />
        </div>
      </div>
      <div class="field">
        <div class="field-header">
          <label class="label" for="description">
            Description
            <br />
            <small>This text appears on links to your page</small>
          </label>
          <label class="checkbox">
            edit
            <input type="checkbox" v-model="edit.description" />
          </label>
        </div>
        <div class="control">
          <input
            class="input"
            type="text"
            id="title"
            v-model="page.description"
            :disabled="!edit.description"
          />
        </div>
      </div>
      <div class="field">
        <div class="field-header">
          <label class="label" for="category">
            Category
            <br />
            <small>
              Choose from a list of existing categories, or enter the name of a
              new one.
            </small>
          </label>
          <label class="checkbox">
            edit
            <input type="checkbox" v-model="edit.category" />
          </label>
        </div>
        <div class="control">
          <input
            class="input"
            list="categories"
            id="category"
            name="category"
            v-model="page.category"
            :disabled="!edit.category"
          />
        </div>
        <datalist id="categories">
          <option
            v-for="pageCategory of page_categories"
            :key="pageCategory"
            :value="pageCategory"
          ></option>
        </datalist>
      </div>

      <hr class="margin--top margin--bottom" />

      <label class="label">Page Content</label>
      <div class="sgds-tabs">
        <ul>
          <li :class="{ 'is-active': !showOriginal }">
            <a
              @click.prevent="showOriginal = false"
              :style="{ cursor: 'pointer' }"
              >Editor</a
            >
          </li>
          <li :class="{ 'is-active': showOriginal }">
            <a
              @click.prevent="showOriginal = true"
              :style="{ cursor: 'pointer' }"
              >Original</a
            >
          </li>
        </ul>
      </div>
      <TextEditor :page_content="page_content" v-show="!showOriginal">
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

      <div
        class="original-content content has-default-header-styles"
        v-show="showOriginal"
        v-html="sanitizedOriginalContent"
      ></div>
    </div>
  </div>
</template>

<script>
import Noty from "noty";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VerifyAndSubmit from "../lib/VerifyAndSubmit.vue";
import TextEditor from "../lib/TextEditor.vue";
import { sanitize, apiClient, detectFormErrors, hasErrors } from "../lib";

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
    },
    page_collection: {
      type: String,
      required: true
    },
    page_categories: {
      // List of existing categories
      type: Array
    }
  },
  data() {
    return {
      quill: null,
      showOriginal: false,
      sanitizedOriginalContent: "",
      isLoading: false,
      imageSrc: "",
      page: {
        title: this.page_title,
        category: this.page_category,
        description: this.page_description
      },
      edit: {
        title: false,
        category: false,
        description: false
      },
      errors: {
        title: "",
        category: "",
        description: ""
      }
    };
  },
  created() {
    this.sanitizedOriginalContent = sanitize(this.page_content);
  },
  methods: {
    submitChanges({ email, otp, otpRequestId }, updatedContent) {
      let formValid = this.validateForm();
      if (!formValid) {
        return;
      }
      const submission = this.collectSubmission(updatedContent);
      this.isLoading = true;
      apiClient
        .post("/submit-article-changes", {
          ...submission,
          email,
          otp,
          otpRequestId
        })
        .then(response => {
          let prLink = response.data.pr;
          new Noty({
            type: "success",
            text: `Your contribution has been submitted! <a href='${prLink}'>View its approval progress here</a>`
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
    },
    collectSubmission(updatedContent) {
      let submissions = {
        page_title: this.page_title,
        page_layout: this.page_layout,
        page_category: this.page_category,
        page_description: this.page_description,
        page_path: this.page_path,
        page_content: sanitize(updatedContent),
        page_collection: this.page_collection
      };
      let editableFields = Object.keys(this.edit);
      for (let field of editableFields) {
        if (this.edit[field]) {
          submissions[`page_${field}`] = this.page[field];
        }
      }
      return submissions;
    },
    validateForm() {
      let errors = detectFormErrors({
        form: { ...this.page }
      });
      Object.assign(this.errors, errors);
      return !hasErrors(errors);
    }
  }
};
</script>

<style scoped>
.article-editor-container {
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.sgds-tabs {
  margin-bottom: 0;
}

.sgds-tabs ul {
  margin: 0;
}

.sgds-tabs li {
  flex: 1 1 auto;
  margin: 0;
}

.sgds-tabs li a {
  cursor: pointer;
}

.original-content {
  border: 1px solid #ccc;
  overflow-y: auto;
  padding: 12px 15px;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
