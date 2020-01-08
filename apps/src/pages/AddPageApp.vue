<template>
  <div>
    <div class="row margin--top is-multiline background-light">
      <div class="col is-12">
        <h5 class="has-text-weight-semibold description">
          Have something to contribute?
        </h5>
        <p>
          Submit your content below, or
          <a href="https://form.gov.sg/5e158a8b8967b800114d5a89"
            >let us know your suggestions</a
          >.
        </p>
        <button
          class="sgds-button is-secondary has-text-weight-semibold"
          v-on:click="showAddPageForm = !showAddPageForm"
        >
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
