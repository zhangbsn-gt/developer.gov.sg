<template>
    <div id="workflow">
        <h4>How can we help you?</h4>
        <h3>
            I need a
            <div class="sgds-dropdown">
                <div class="sgds-dropdown-trigger">
                    <button
                        class="sgds-button"
                        aria-haspopup="true"
                        aria-controls="sgds-dropdown-menu"
                    >
                        <span>{{ selectedApp }}</span>
                        <span class="icon">
                            <span class="sgds-icon sgds-icon-chevron-down"></span>
                        </span>
                    </button>
                </div>
                <div class="sgds-dropdown-menu" id="sgds-dropdown-menu" role="menu">
                    <div class="sgds-dropdown-content">
                        <a
                            v-on:click="selectedApp = application"
                            v-for="application in APPLICATIONS"
                            class="sgds-dropdown-item"
                            :key="application"
                        >{{ application }}</a>
                    </div>
                </div>
            </div>and
            <div class="sgds-dropdown">
                <div class="sgds-dropdown-trigger">
                    <button
                        class="sgds-button"
                        aria-haspopup="true"
                        aria-controls="sgds-dropdown-menu"
                    >
                        <span>{{ selectedStage.title }}</span>
                        <span class="icon">
                            <span class="sgds-icon sgds-icon-chevron-down"></span>
                        </span>
                    </button>
                </div>
                <div class="sgds-dropdown-menu" id="sgds-dropdown-menu" role="menu">
                    <div class="sgds-dropdown-content">
                        <a
                            v-on:click="selectedStage = stage"
                            v-for="stage in STAGES"
                            class="sgds-dropdown-item"
                            :key="stage.tag"
                        >{{ stage.title }}</a>
                    </div>
                </div>
            </div>
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
import { STAGES, APPLICATIONS, CATEGORIES } from "./WorkflowData";

export default {
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