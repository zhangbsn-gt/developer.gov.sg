<template>
  <div>
    <div class="row margin--top is-multiline background-light">
      <div class="col is-12">
        <p class="margin--top--sm margin--bottom--sm has-text-weight-semibold">
          Help everyone discover what the Singapore Government offers.
        </p>
        <button
          style="width: 100%"
          class="sgds-button is-primary has-text-weight-semibold"
          v-on:click="showAddPageForm = !showAddPageForm"
        >
          Suggest new {{ this.type.toLowerCase() }}
          <i
            class="sgds-icon sgds-icon-chevron-down"
            v-if="!showAddPageForm"
          ></i>
          <i class="sgds-icon sgds-icon-chevron-up" v-else></i>
        </button>
      </div>
      <div class="col is-12" v-show="showAddPageForm">
        <AddPageForm
          :type="page_type"
          :categories="page_categories"
          @close="showAddPageForm = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddPageForm from "./AddPageForm.vue";
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    categories: {
      type: String,
      required: true
    }
  },
  components: { AddPageForm },
  data() {
    return {
      showAddPageForm: false,
      page_type: "",
      page_categories: ""
    };
  },
  methods: {
    checkPageType: function() {
      this.page_type = this.type;
      this.page_categories = JSON.parse(this.categories).filter(
        category => category != null
      );
    }
  },
  beforeMount() {
    this.checkPageType();
  }
};
</script>

<style scoped>
.background-light {
  background-color: #f5f5f5;
}
</style>
