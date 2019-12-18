<template>
  <div>
    <div class="row margin--top is-multiline background-light">
      <div class="col is-12">
        <h5 class="has-text-weight-semibold description">
          Don’t see what you’re looking for?
        </h5>
        <p>
          As much as we try to be informative, we’re always looking for ways to
          improve the Developer Portal. If you’re interested in contributing or
          improving the site let us know how!
        </p>
        <button
          class="sgds-button is-secondary has-text-weight-semibold"
          v-on:click="showAddPageForm = !showAddPageForm">
          Contribute new {{ this.collection.toLowerCase() }}
        </button>
      </div>

      <Modal v-if="showAddPageForm">
        <template v-slot:header>
          <button
            class="sgds-button is-rounded"
            type="button"
            @click="showAddPageForm = false"
          >
            <span class="sgds-icon sgds-icon-cross"></span>
          </button>
        </template>
        <ArticleEditor
          editorType="add"
          :page_collection="collection"
          :page_categories="categoryList"
          @close="showAddPageForm = false"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import ArticleEditor from "../lib/ArticleEditor.vue";
import Modal from "../lib/Modal.vue";
export default {
  props: {
    collection: {
      type: String,
      required: true
    },
    categories: {
      type: String,
      required: true
    }
  },
  components: { ArticleEditor, Modal },
  data() {
    return {
      showAddPageForm: false,
      categoryList: JSON.parse(this.categories).filter(category => category)
    };
  }
};
</script>

<style scoped>
.description {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.background-light {
  background-color: #f5f5f5;
}
</style>
