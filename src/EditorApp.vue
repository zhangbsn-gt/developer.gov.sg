<template>
  <div id="edit-app">
    <a
      class="sgds-button is-rounded"
      @click="openEditor({
        title,
        permalink,
        category
      })"
    >Edit Page</a>
    <Editor
      v-if="showEditorModal"
      :page_path="page_path"
      :page_title="page_title"
      :page_category="page_category"
      :initial_content="content"
      @close="showEditorModal = false"
      @form-submit-success="showEditorModal = false"
    ></Editor>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
export default {
  props: ["title", "permalink", "category"],
  components: { Editor },
  data() {
    return {
      showEditorModal: false
    };
  },
  methods: {
    openEditor({ title, permalink, category }) {
      this.page_path = permalink;
      this.page_title = title;
      this.page_category = category;
      this.content = document.getElementsByClassName("article")[0].innerHTML;
      this.showEditorModal = true;
    }
  }
};
</script>