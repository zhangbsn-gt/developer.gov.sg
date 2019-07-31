<template>
    <div id="workflow">
        <h4>How can we help you?</h4>
        <h3>
            I need a
            <SgdsDropdown :text="selectedApp">
                <SgdsDropdownItem
                    v-for="application of APPLICATIONS"
                    :key="application"
                    v-on:click="selectedApp = application"
                >{{ application }}</SgdsDropdownItem>
            </SgdsDropdown>and
            <SgdsDropdown :text="selectedStage.title">
                <SgdsDropdownItem
                    v-for="stage in STAGES"
                    :key="stage.tag"
                    v-on:click="selectedStage = stage"
                >{{ stage.title }}</SgdsDropdownItem>
            </SgdsDropdown>
        </h3>
        <hr />
        <template v-for="(category, categoryIndex) of highlightedCategories">
            <div :key="category.tag">
                <h5>{{ category.title }}</h5>
                <p>{{ category.description }}</p>
                <div class="row is-multiline">
                    <div
                        class="col is-4 is-flex"
                        v-for="(workflow, index) in category.workflows"
                        :key="index"
                    >
                        <a class="sgds-card sgds-card-button" :href="workflow.url">
                            <div class="sgds-card-header">
                                <p class="sgds-card-header-title">{{ workflow.title }}</p>
                            </div>
                            <div class="sgds-card-content">
                                <small>{{workflow.description }}</small>
                            </div>
                        </a>
                    </div>
                </div>
                <hr v-if="categoryIndex !== highlightedCategories.length - 1" />
            </div>
        </template>
    </div>
</template>

<script>
import { SgdsDropdown, SgdsDropdownItem } from "sgds-govtech-vue";
import { STAGES, APPLICATIONS, CATEGORIES } from "./WorkflowData";

export default {
    components: {
        SgdsDropdown,
        SgdsDropdownItem
    },
    data() {
        return {
            workflows: window.workflows,
            selectedStage: STAGES.BEGINNER,
            selectedApp: APPLICATIONS.STATIC_WEBSITE,
            STAGES: STAGES,
            APPLICATIONS: APPLICATIONS,
            CATEGORIES: CATEGORIES
        };
    },
    computed: {
        highlightedCategories() {
            // Create a copy for computed property, else it changes the data() state directly
            let hc = this.CATEGORIES.map(category => {
                return {
                    ...category
                };
            });
            hc.forEach((category, index) => {
                category.workflows = this.highlightedWorkflows.filter(
                    workflow => workflow.category === category.tag
                );
            });
            return hc.filter(category => category.workflows.length > 0);
        },
        highlightedWorkflows() {
            return this.workflows.filter(workflow => {
                let stages = workflow.stage
                    ? workflow.stage.split(",").map(s => s.trim())
                    : [];
                let applications = workflow.application
                    ? workflow.application.split(",").map(s => s.trim())
                    : [];

                return (
                    stages.includes(this.selectedStage.tag) &&
                    applications.includes(this.selectedApp)
                );
            });
        }
    }
};
</script>