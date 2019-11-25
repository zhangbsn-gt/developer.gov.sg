<template>
  <div>
    <div class="row margin--top is-multiline background-light">
      <div class="col is-12">
        <p class="has-text-weight-semibold description">
          Help everyone discover what the Singapore Government offers.
          <button
            class="sgds-button is-secondary has-text-weight-semibold"
            v-on:click="showAddPageForm = !showAddPageForm"
          >
            Suggest new {{ this.collection.toLowerCase() }}
          </button>
        </p>
      </div>

      <Modal :showModal="showAddPageForm">
        <template v-slot:header>
          <button
            class="sgds-button is-rounded"
            type="button"
            @click="showAddPageForm = false"
          >
            <span class="sgds-icon sgds-icon-cross"></span>
          </button>
        </template>
        <AddPageForm
          :collection="collection"
          :categories="categoryList"
          @close="showAddPageForm = false"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import AddPageForm from "./AddPageForm.vue";
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
  components: { AddPageForm, Modal },
  data() {
    return {
      showAddPageForm: false
    };
  },
  computed: {
    categoryList() {
      return JSON.parse(this.categories).filter(category => category);
    }
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
