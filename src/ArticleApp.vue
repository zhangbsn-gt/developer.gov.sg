<template>
    <div id="article-editor-app">
        <a class="sgds-button is-rounded" @click="openEditor">Edit This Page</a>
    </div>
</template>

<script>
import sanitizeHtml from "sanitize-html";
import ArticleEditor from "./ArticleEditor.vue";

export default {
    props: {
        title: {
            // From front matter
            type: String,
            requred: true
        },
        permalink: {
            // From front matter
            type: String,
            required: true
        },
        category: {
            // From front matter
            type: String
        },
        layout: {
            // From front matter
            type: String,
            required: true
        },
        content: {
            // From Jekyll render. HTML.
            type: String,
            required: true
        }
    },
    data() {
        return {
            page_content: null
        };
    },
    methods: {
        openEditor() {
            this.$modal.show(
                ArticleEditor,
                {
                    page_path: this.permalink,
                    page_title: this.title,
                    page_category: this.category,
                    page_content: sanitizeHtml(this.content),
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