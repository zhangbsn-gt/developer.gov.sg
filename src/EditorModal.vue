<template>
    <div class="modal-mask" v-on:keypress="logKey">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-top">
                    <button
                        class="sgds-button is-rounded"
                        type="button"
                        @click="$emit('close-modal')"
                    >
                        <span class="sgds-icon sgds-icon-cross"></span>
                    </button>
                </div>
                <div class="modal-header">
                    <slot name="modal-header"></slot>
                </div>

                <div class="modal-body">
                    <slot name="modal-body"></slot>
                </div>

                <div class="modal-footer">
                    <slot name="modal-footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["onMount"],
    data() {
        return {};
    },
    methods: {},
    mounted() {
        if (this.onMount) {
            this.onMount();
        }
    }
};
</script>

<style>
/* no scoped css. styles apply .article, outside this component */
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 70%;
    margin: 0px auto;
    padding: 15px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-top {
    display: flex;
    flex-direction: row-reverse;
}

.modal-header h3 {
    margin-top: 0;
    color: #888888;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    min-height: 40px;
}

.modal-default-button {
    float: right;
}
</style>
