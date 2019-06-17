<template>
    <div id="article-editor-app">
        <a class="sgds-button is-rounded" @click="openEditor">Edit This Page</a>
    </div>
</template>

<script>
import ArticleEditor from "./ArticleEditor.vue";

export default {
    props: ["title", "permalink", "category", "layout"],
    data() {
        return {
            page_content: null
        };
    },
    created() {
        this.page_content = document.getElementsByClassName(
            "article"
        )[0].innerHTML;
    },
    methods: {
        openEditor() {
            this.$modal.show(
                ArticleEditor,
                {
                    page_path: this.permalink,
                    page_title: this.title,
                    page_category: this.category,
                    page_content: this.page_content,
                    page_layout: this.layout
                },
                {
                    clickToClose: false,
                    width: "70%",
                    height: "auto",
                    minWidth: 250,
                    minHeight: 400,
                    scrollable: true
                }
            );
        }
    }
};
</script>