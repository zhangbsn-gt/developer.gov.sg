<template>
    <div>
        <div class="row has-background-light margin--top">
            <div class="col is-8">
                <p
                    class="margin--top--sm margin--bottom--sm has-text-weight-semibold"
                >Help everyone discover what the Singapore Government offers.</p>
            </div>
            <div class="col is-4 has-text-right">
                <a
                    class="sgds-button is-rounded is-fullwidth is-primary"
                    v-on:click="showAddPageForm = !showAddPageForm"
                >
                    Add New Product
                    <i
                        class="sgds-icon sgds-icon-chevron-down"
                        v-if="!showAddPageForm"
                    ></i>
                    <i class="sgds-icon sgds-icon-chevron-up" v-else></i>
                </a>
            </div>
        </div>
        <div class="row" v-if="showAddPageForm">
            <div class="col is-12">
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
            // need to strip off nil in the array string if not the json parse will fail
            this.page_categories = JSON.parse(
                this.categories.replace("nil, ", "").replace(", nil", "")
            );
        }
    },
    beforeMount() {
        this.checkPageType();
    }
};
</script>