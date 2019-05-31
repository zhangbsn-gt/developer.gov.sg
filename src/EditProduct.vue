<template>
    <div id="edit-app">
        <a class="sgds-button is-rounded" @click="openEditor">Edit This Page</a>
        <transition name="modal">
            <EditorModal
                v-if="showEditorModal"
                :page_path="permalink"
                :page_title="title"
                :page_category="category"
                :page_layout="layout"
                :initial_content="content"
                @close="showEditorModal = false"
                @form-submit-success="showEditorModal = false"
            ></EditorModal>
        </transition>
    </div>
</template>

<script>
import EditorModal from "./EditorModal.vue";
export default {
    props: ["title", "permalink", "category", "layout"],
    components: { EditorModal },
    data() {
        return {
            showEditorModal: false,
            content: ""
        };
    },
    created() {
        this.content = document.getElementsByClassName("article")[0].innerHTML;
    },
    methods: {
        openEditor() {
            this.showEditorModal = true;
        }
    }
};
</script>

<style>
.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
