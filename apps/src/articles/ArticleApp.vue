<template>
  <div id="article-editor-app" class="article-editor-app">
    <button
      class="sgds-button is-rounded is-small"
      @click="showEditorModal = true"
    >
      Edit this page
    </button>
    <a
      href="https://form.gov.sg/5e158a8b8967b800114d5a89"
      >Give feedback for this page</a
    >
    <Modal v-if="showEditorModal">
      <template v-slot:header>
        <button
          class="sgds-button is-rounded"
          type="button"
          @click="showEditorModal = false"
        >
          <span class="sgds-icon sgds-icon-cross"></span>
        </button>
      </template>
      <ArticleEditor
        editorType="edit"
        :page_title="title"
        :page_layout="layout"
        :page_category="category"
        :page_description="description"
        :page_path="path"
        :page_content="content"
        :page_collection="collection"
        :page_categories="
          categories
            ? JSON.parse(this.categories).filter(category => category)
            : null
        "
        @close="showEditorModal = false"
      />
    </Modal>
  </div>
</template>

<script>
import ArticleEditor from "../lib/ArticleEditor.vue";
import Modal from "../lib/Modal.vue";

export default {
  props: {
    title: {
      // From front matter
      type: String,
      requred: true
    },
    layout: {
      // From front matter
      type: String,
      required: true
    },
    category: {
      // From front matter
      type: String,
      required: true
    },
    description: {
      // From front matter
      type: String
    },
    url: {
      // URL to page, eg /products/abc.html
      type: String,
      required: true
    },
    path: {
      // Path to actual file, eg /_products/abc.html
      type: String,
      required: true
    },
    content: {
      // From Jekyll render. HTML.
      type: String,
      required: true
    },
    collection: {
      type: String,
      required: true
    },
    categories: {
      type: String // JSON array string
    }
  },
  components: { ArticleEditor, Modal },
  data() {
    return {
      page_content: null,
      showEditorModal: false
    };
  }
};
</script>

<style scoped>
.article-editor-app > button {
  margin-right: 1rem;
}
.article-editor-app {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
