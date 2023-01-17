<template>
  <form class="vld-parent">
    <Loading :active.sync="isLoading" :is-full-page="false"></Loading>

    <button
      class="sgds-button is-primary dropdown-button"
      type="button"
      @click="showPageEditor = !showPageEditor"
      :class="{ active: showPageEditor }"
    >
      Page content
      <i class="material-icons" v-if="showPageEditor"> expand_less </i>
      <i class="material-icons" v-else> expand_more </i>
    </button>

    <div v-show="showPageEditor">
      <template v-if="editorType === 'edit'">
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
        <div
          class="original-content content has-default-header-styles"
          v-show="showOriginal"
          v-html="sanitizedOriginalContent"
        ></div>
      </template>

      <TextEditor :initialContent="page_content"></TextEditor>
    </div>

    <button
      class="sgds-button is-primary dropdown-button"
      type="button"
      @click="showPageFields = !showPageFields"
      :class="{ active: showPageFields }"
      style="margin-top: 4rem"
    >
      Page details
      <i class="material-icons" v-if="showPageFields"> expand_less </i>
      <i class="material-icons" v-else> expand_more </i>
    </button>
    <div class="meta-fields" v-show="showPageFields">
      <div class="field">
        <div class="field-header">
          <label for="title" class="label">Title</label>
          <label class="checkbox" v-if="editorType === 'edit'">
            edit
            <input type="checkbox" v-model="edit.title" />
          </label>
        </div>
        <div class="control">
          <input
            id="title"
            name="title"
            class="input"
            type="text"
            v-model="form.title"
            :disabled="!edit.title"
            @blur="validateForm"
          />
        </div>
        <p class="help is-danger" v-if="errors.title">
          {{ errors.title }}
        </p>
      </div>
      <div class="field">
        <div class="field-header">
          <label class="label" for="description">
            Description
            <br />
            <small>This text appears on links to your page</small>
          </label>
          <label class="checkbox" v-if="editorType === 'edit'">
            edit
            <input type="checkbox" v-model="edit.description" />
          </label>
        </div>
        <div class="control">
          <input
            id="description"
            name="description"
            class="input"
            type="text"
            placeholder="This product is..."
            v-model="form.description"
            :disabled="!edit.description"
            @blur="validateForm"
          />
        </div>
        <p class="help is-danger" v-if="errors.description">
          {{ errors.description }}
        </p>
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
          <label class="checkbox" v-if="editorType === 'edit'">
            edit
            <input type="checkbox" v-model="edit.category" />
          </label>
        </div>

        <input
          id="category"
          name="category"
          class="input"
          type="text"
          list="categorynames"
          v-model="form.category"
          :disabled="!edit.category"
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
    </div>
    <VerifyAndSubmit
      :validateForm="validateForm"
      @submit="submitChanges"
      @loading="updateLoadingState"
      style="margin-top: 4rem"
    />
  </form>
</template>

<script>
import Noty from "noty";
import Loading from "vue-loading-overlay";
import { mapState } from "vuex";
import "vue-loading-overlay/dist/css/index.css";
import {
  urlRegex,
  sanitize,
  apiClient,
  detectFormErrors,
  hasErrors,
} from "./index";
import VerifyAndSubmit from "./VerifyAndSubmit.vue";
import TextEditor from "./TextEditor.vue";

export default {
  props: {
    editorType: {
      type: String,
      required: true,
      validator: value => ["add", "edit"].indexOf(value) !== -1,
    },
    page_title: {
      type: String,
    },
    page_layout: {
      type: String,
    },
    page_category: {
      type: String,
    },
    page_description: {
      type: String,
    },
    page_path: {
      type: String,
    },
    page_content: {
      type: String,
    },
    page_collection: {
      type: String,
      required: true,
    },
    page_categories: {
      // List of existing categories
      type: Array,
      required: true,
    },
  },
  components: { VerifyAndSubmit, Loading, TextEditor },
  created() {
    if (this.page_content) {
      this.sanitizedOriginalContent = sanitize(this.page_content);
    }
  },
  data() {
    return {
      isLoading: false,
      showOriginal: false,
      sanitizedOriginalContent: "",
      showPageEditor: true,
      showPageFields: true,
      form: {
        title: this.page_title,
        category: this.page_category,
        description: this.page_description,
      },
      errors: {
        title: "",
        category: "",
        description: "",
      },
      edit: {
        title: this.editorType === "add",
        category: this.editorType === "add",
        description: this.editorType === "add",
      },
    };
  },
  computed: {
    ...mapState("pageEditor", ["editor"]),
    apiPath() {
      let path;
      if (this.editorType === "edit") {
        path = "/submit-article-changes";
      }
      if (this.editorType === "add") {
        path = "/request-new-page";
      }
      return path;
    },
  },
  methods: {
    validateForm() {
      let errors = detectFormErrors({
        form: { ...this.form },
      });
      Object.assign(this.errors, errors);
      return !hasErrors(errors);
    },
    submitChanges({ email, otp, otpRequestId }) {
      let formValid = this.validateForm();
      if (!formValid) {
        return;
      }
      const submission = this.collectSubmission(this.editor.getHTML());
      this.isLoading = true;

      apiClient
        .post(this.apiPath, {
          ...submission,
          email,
          otp,
          otpRequestId,
        })
        .then(response => {
          let prLink = response.data.pr;
          new Noty({
            type: "success",
            text: `Your submission ${this.form.title} is successfulsubmitted! <a href='${prLink}'>View its approval progress here</a>`,
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
            text: `There was an error with submission. ${message}`,
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
        page_collection: this.page_collection,
      };
      let editableFields = Object.keys(this.edit);
      for (let field of editableFields) {
        if (this.edit[field]) {
          submissions[`page_${field}`] = this.form[field];
        }
      }
      return submissions;
    },
  },
};
</script>

<style scoped>
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

.sgds-tabs li.is-active {
  background-color: #efefef;
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

.dropdown-button {
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.meta-fields {
  border: 1px solid #c3c3c3;
  padding: 0.5rem;
}
</style>
