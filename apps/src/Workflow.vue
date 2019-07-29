<template>
    <div id="workflow">
        <h4>How can we help you?</h4>
        <h3>I need a
            <div class="sgds-dropdown">
                <div class="sgds-dropdown-trigger">
                    <button class="sgds-button" aria-haspopup="true" aria-controls="sgds-dropdown-menu">
                        <span>{{ selectedApp }}</span>
                        <span class="icon">
                    <span class="sgds-icon sgds-icon-chevron-down"></span>
                </span>
                    </button>
                </div>
                <div class="sgds-dropdown-menu" id="sgds-dropdown-menu" role="menu">
                    <div class="sgds-dropdown-content">
                        <a v-on:click="selectedApp = application"
                           v-for="application in APPLICATION" class="sgds-dropdown-item">{{ application }}</a>
                    </div>
                </div>
            </div>
            and
            <div class="sgds-dropdown">
                <div class="sgds-dropdown-trigger">
                    <button class="sgds-button" aria-haspopup="true" aria-controls="sgds-dropdown-menu">
                        <span>{{ selectedStage.title }}</span>
                        <span class="icon">
                    <span class="sgds-icon sgds-icon-chevron-down"></span>
                </span>
                    </button>
                </div>
                <div class="sgds-dropdown-menu" id="sgds-dropdown-menu" role="menu">
                    <div class="sgds-dropdown-content">
                        <a v-on:click="selectedStage = stage"
                           v-for="stage in STAGE" class="sgds-dropdown-item">{{ stage.title }}</a>
                    </div>
                </div>
            </div>
        </h3>
        <hr>
        <template v-for="category in CATEGORY" v-if="category.filteredWorkflows.length>0">
            <h5>{{ category.title }}</h5>
            <p>{{ category.description }}</p>
            <div class="row is-multiline">
                <div class="col is-4 is-flex" v-for="(workflow, index) in category.filteredWorkflows" :key="index">
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
            <hr v-if="category != CATEGORY.RETIREMENT">
        </template>
    </div>
</template>

<script>

    import { STAGE, APPLICATION, CATEGORY } from "./WorkflowData";

    export default {
        data() {
            return {
                workflows: window.workflows,
                selectedStage: STAGE.BEGINNER,
                selectedApp: APPLICATION.STATIC_WEBSITE,
                STAGE: STAGE,
                APPLICATION: APPLICATION,
                CATEGORY: CATEGORY
            };
        },
        beforeMount() {
            var parent = this;
            for (var key in this.CATEGORY){
                this.CATEGORY[key].workflows = this.workflows.filter(function (workflow) {
                    return workflow.category && workflow.category.trim() == parent.CATEGORY[key].tag;
                });
                this.filterWorkflow(this.CATEGORY[key]);
            }

        },
        watch: {
            selectedStage: function () {
                for (var key in this.CATEGORY) {
                    this.filterWorkflow(this.CATEGORY[key]);
                }
            },
            selectedApp: function () {
                for (var key in this.CATEGORY) {
                    this.filterWorkflow(this.CATEGORY[key]);
                }
            }
        },
        methods: {
            filterWorkflow(category) {
                var parent = this;
                if(category.workflows) {
                    category.filteredWorkflows = category.workflows.filter(function (workflow) {
                        if (parent.selectedStage && parent.selectedApp) {
                            var stages = workflow.stage ? workflow.stage.split(',').map(s => s.trim()) : [];
                            var applications = workflow.application ? workflow.application.split(',').map(s => s.trim()) : [];
                            return workflow.category == category.tag
                                && ((workflow.stage && stages.includes(parent.selectedStage.tag))
                                    && (workflow.application && applications.includes(parent.selectedApp)));
                        }
                        return true;
                    });
                }else{
                    category.filteredWorkflows = [];
                }
            },
        }
    };


</script>