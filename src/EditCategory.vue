<template>
    <div id="edit-category">
        <a
            class="sgds-button is-rounded"
            @click="showEditModal({stage: 'select-operation'})"
        >Edit This Page</a>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modalStage: null
        };
    },
    methods: {
        showEditModal(options) {
            this.modalStage = options.stage;
        }
    }
};
</script>
