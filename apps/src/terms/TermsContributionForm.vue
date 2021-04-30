<template>
  <form @submit.prevent="handleSubmit" class="vld-parent">
    <Loading :active.sync="isLoading" :is-full-page="false"></Loading>

    <div class="row">
      <div class="col">
        <label for="term" class="has-text-weight-semibold">Acronym</label>
        <input
          id="term"
          name="term"
          class="input"
          :class="{ 'is-danger': errors.term }"
          type="text"
          placeholder="SGTS"
          :value="form.term"
          @input="form.term = $event.target.value.toUpperCase()"
          required
          @blur="validateInput('term')"
        />
        <p class="help is-danger" v-if="errors.term">{{ errors.term }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="full-term" class="has-text-weight-semibold"
          >What it stands for</label
        >
        <input
          id="full-term"
          name="full_term"
          class="input"
          :class="{ 'is-danger': errors.full_term }"
          type="text"
          placeholder="Singapore Government Tech Stack"
          v-model="form.full_term"
          required
          @blur="validateInput('full_term')"
        />
        <p class="help is-danger" v-if="errors.full_term">
          {{ errors.full_term }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="description" class="has-text-weight-semibold"
          >Short description</label
        >
        <input
          id="description"
          name="description"
          class="input"
          :class="{ 'is-danger': errors.description }"
          type="text"
          placeholder="SGTS is ..."
          v-model="form.description"
          required
          @blur="validateInput('description')"
        />
        <p class="help is-danger" v-if="errors.description">
          {{ errors.description }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="tag" class="has-text-weight-semibold"
          >Tags <em>(optional)</em></label
        >
        <input
          id="tag"
          name="tag"
          class="input"
          :class="{ 'is-danger': errors.tag }"
          type="text"
          placeholder="platform"
          v-model="form.tag"
          ref="tagInput"
          @blur="validateInput('tag')"
        />
        <p class="help is-danger" v-if="errors.tag">{{ errors.tag }}</p>
        <button
          class="sgds-button margin--top--sm"
          type="button"
          @click.prevent="addTag"
        >
          Add a tag
        </button>
        <div>
          <button
            type="button"
            disabled
            class="sgds-button "
            v-for="(tag, index) of form.tags"
            :key="index + tag"
          >
            {{ tag }}
            <span
              class="sgds-icon sgds-icon-cross"
              @click="form.tags.splice(index, 1)"
              :style="{ cursor: 'pointer' }"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="link" class="has-text-weight-semibold"
          >Links <em>(optional)</em></label
        >
        <input
          id="link"
          name="link"
          class="input"
          :class="{ 'is-danger': errors.link }"
          type="text"
          placeholder="https://tech.gov.sg"
          v-model="form.link"
          ref="linkInput"
          @blur="validateInput('link')"
        />
        <p class="help is-danger" v-if="errors.link">{{ errors.link }}</p>
        <button
          class="sgds-button margin--top--sm"
          type="button"
          @click.prevent="addLink"
        >
          Add a link
        </button>
        <div>
          <button
            type="button"
            disabled
            class="sgds-button "
            v-for="(link, index) of form.links"
            :key="index + link"
          >
            {{ link }}
            <span
              class="sgds-icon sgds-icon-cross"
              @click="form.links.splice(index, 1)"
              :style="{ cursor: 'pointer' }"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <button
      type="submit"
      class="sgds-button is-primary submit"
      :disabled="false"
      @click.prevent="submit"
    >
      Submit
    </button>
  </form>
</template>

<script>
import Noty from "noty";
import Loading from "vue-loading-overlay";
import { urlRegex, apiClient, detectFormErrors, hasErrors } from "../lib";
import VerifyAndSubmit from "../lib/VerifyAndSubmit.vue";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: { VerifyAndSubmit, Loading },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["add", "edit"].indexOf(value) !== -1;
      }
    },
    termId: {
      type: String
    },
    term: {
      type: String
    },
    full_term: {
      type: String
    },
    description: {
      type: String
    },
    links: {
      type: Array
    },
    tags: {
      type: Array
    }
  },
  data: function() {
    return {
      isLoading: false,
      form: {
        term: null,
        full_term: null,
        description: null,
        link: null,
        links: [],
        tag: null,
        tags: []
      },
      errors: {
        term: "",
        full_term: "",
        description: "",
        tag: "",
        link: ""
      }
    };
  },
  methods: {
    submit() {
      let formValid = this.validateForm();
      if (!formValid) {
        return;
      }
      let submission = {
        term: this.form.term,
        full_term: this.form.full_term,
        description: this.form.description,
        links: this.form.links,
        tags: this.form.tags
      };
      if (this.type === "edit") {
        submission = Object.assign({ id: this.termId }, submission);
      }

      let axiosConfig = {
        data: submission
      };
      if (this.type === "add") {
        axiosConfig.method = "post";
      }
      if (this.type === "edit") {
        axiosConfig.method = "put";
      }
      this.isLoading = true;
      apiClient("/terms", axiosConfig)
        .then(response => {
          new Noty({
            type: "success",
            text: `Submission successful! You can view its approval progress <a href='${response.data.pr}'>here.</a>`
          }).show();
          this.$emit("close");
        })
        .catch(err => {
          let message = err.message || err;
          if (err.response && err.response.data) {
            message = err.response.data.error;
          }
          new Noty({
            type: "error",
            text: `An error has occurred: ${message}`
          }).show();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    validateForm() {
      let errors = detectFormErrors({
        form: { ...this.form },
        fields: ["term", "full_term", "description"]
      });
      Object.assign(this.errors, errors);
      return !hasErrors(errors);
    },
    validateInput(field) {
      // Removes error message on input if validation passes
      if (
        (this.form[field] && this.errors[field]) ||
        field === "link" ||
        field === "tag"
      ) {
        this.errors[field] = null;
      }
    },
    addTag() {
      if (!this.form.tag) {
        this.errors.tag = "Please enter a valid tag.";
        this.$refs.tagInput.focus();
        return;
      }

      let tag = this.form.tag.toLowerCase();
      if (this.form.tags.indexOf(tag) !== -1) {
        this.errors.tag = "This tag already exists.";
        this.$refs.tagInput.focus();
        return;
      }

      this.form.tags.push(tag);
      this.form.tag = null;
    },
    addLink() {
      if (!this.form.link) {
        this.errors.link = "Please enter a valid link.";
        this.$refs.linkInput.focus();
        return;
      }

      if (!urlRegex.test(this.form.link)) {
        this.errors.link = "Please enter a valid URL.";
        this.$refs.linkInput.focus();
        return;
      }

      let link = this.form.link.toLowerCase();
      if (this.form.links.indexOf(link) !== -1) {
        this.errors.link = "This link already exists.";
        this.$refs.linkInput.focus();
        return;
      }

      this.form.links.push(link);
      this.form.link = null;
    },
    changeLoadingState(isLoading) {
      this.isLoading = isLoading;
    }
  },
  created() {
    if (this.type === "edit") {
      ["term", "full_term", "description"].forEach(field => {
        if (this[field]) {
          this.form[field] = this[field];
        }
      });
      if (this.links) {
        this.form.links = [...this.links];
      }
      if (this.tags) {
        this.form.tags = [...this.tags];
      }
    }
  }
};
</script>

<style scoped>
.form-list {
  display: flex;
  justify-content: space-between;
}
label em {
  color: #7b7b7b;
}
</style>
