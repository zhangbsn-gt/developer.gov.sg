<template>
    <div id="terms">
        <div :style="contributeButtonContainerStyle">
            <button
                type="button"
                class="sgds-button default"
                v-on:click="showContributionForm = !showContributionForm"
            >
                Contribute an acronym
                <span
                    class="sgds-icon sgds-icon-chevron-down"
                    v-if="!showContributionForm"
                ></span>
                <span class="sgds-icon sgds-icon-chevron-up" v-if="showContributionForm"></span>
            </button>
        </div>
        <div v-if="showContributionForm" :style="contributionFormStyle" class="sgds-card">
            <div class="sgds-card-content">
                <p>Have an initialism/acronym to contribute? Suggest them to us here!</p>
                <ContributionForm type="add" @close="showContributionForm = false"/>
            </div>
        </div>
        <label for="search-input" class="has-text-centered">
            <h5 class="has-text-weight-semibold margin--bottom">Tech Acronyms used in Government</h5>
        </label>
        <div class="control has-icons-left">
            <input
                type="text"
                id="search-input"
                class="input is-medium"
                placeholder="Search an acronym"
                v-model="search"
            >
            <span class="icon">
                <i class="sgds-icon sgds-icon-search is-size-6 search-bar"></i>
            </span>
        </div>
        <br>
        <div
            v-for="term of filteredTerms"
            v-cloak
            class="sgds-card term-card"
            :key="term.id + term.term"
        >
            <div class="sgds-card-content">
                <div class="row">
                    <div class="col is-3">
                        <h6 class="margin--top is-uppercase">{{term.term}}</h6>
                    </div>
                    <div class="col is-9">
                        <p class="has-text-weight-bold">{{term.full_term}}</p>
                        <p>{{term.description}}</p>

                        <div v-if="term.links.length > 0">
                            <p class="has-text-weight-bold">Links</p>
                            <ul>
                                <li v-for="link of term.links" :key="term.term + link">
                                    <a :href="link">{{link}}</a>
                                </li>
                            </ul>
                        </div>

                        <div v-if="term.categories.length > 0">
                            <p class="has-text-weight-bold">Categories</p>
                            <ul>
                                <li
                                    v-for="category of term.categories"
                                    :key="term.term + category"
                                >{{category}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sgds-card-footer">
                <div class="sgds-card-footer-item">
                    <div class="row edit-term">
                        <div class="col">
                            <span class="center-row-content">
                                <a href @click.prevent="editTerm(term.id)">
                                    Suggest an edit for {{ term.term }}
                                    <span
                                        class="sgds-icon sgds-icon-chevron-down"
                                        v-if="!editing[term.id]"
                                    ></span>
                                    <span class="sgds-icon sgds-icon-chevron-up" v-else></span>
                                </a>
                            </span>
                            <div v-if="editing[term.id]">
                                <ContributionForm
                                    type="edit"
                                    @close="editing[term.id] = false"
                                    :termId="term.id"
                                    :term="term.term"
                                    :full_term="term.full_term"
                                    :description="term.description"
                                    :links="term.links"
                                    :categories="term.categories"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ContributionForm from "./TermsContributionForm.vue";
import { loadJson, sortLoadedTerms } from "./lib";

export default {
    components: { ContributionForm },
    data() {
        return {
            terms: [],
            search: "",
            displaySearchResults: false,
            showContributionForm: false,
            contributeButtonContainerStyle: {
                display: "flex",
                flexDirection: "row-reverse"
            },
            contributionFormStyle: {
                padding: "1rem 0"
            },
            editing: {}
        };
    },
    methods: {
        editTerm(index) {
            this.$set(this.editing, index, !this.editing[index]);
        }
    },
    computed: {
        filteredTerms() {
            if (this.terms.length > 0) {
                return this.terms.filter(term => {
                    const searchLowercase = this.search.toLowerCase();
                    const termName = term.term.toLowerCase();
                    const fullTerm = term.full_term.toLowerCase();
                    const description = term.description.toLowerCase();
                    const links = term.links.join("\n");
                    return (
                        termName.indexOf(searchLowercase) !== -1 ||
                        fullTerm.indexOf(searchLowercase) !== -1 ||
                        description.indexOf(searchLowercase) !== -1 ||
                        links.indexOf(searchLowercase) !== -1 ||
                        term.categories.indexOf(searchLowercase) !== -1
                    );
                });
            } else {
                return [];
            }
        }
    },
    created() {
        loadJson("/terms.json", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            this.terms = data.map((termInfo, index) =>
                Object.assign(
                    {
                        id: index
                    },
                    termInfo
                )
            );
        });
    }
};
</script>

<style scoped>
.term-card {
    margin-top: 10px;
}
.edit-term {
    flex: 1 1 auto;
}
.edit-term > .col {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.center-row-content {
    display: flex;
    justify-content: center;
}
</style>
