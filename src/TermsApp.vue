<template>
    <div id="terms">
        <div :style="contributeButtonContainerStyle">
            <button
                type="button"
                class="sgds-button default"
                v-on:click="showContributionForm = !showContributionForm"
            >
                Contribute with your own term
                <span
                    class="sgds-icon sgds-icon-chevron-down"
                    v-if="!showContributionForm"
                ></span>
                <span class="sgds-icon sgds-icon-chevron-up" v-if="showContributionForm"></span>
            </button>
        </div>
        <div v-if="showContributionForm" :style="contributionFormStyle">
            <ContributionForm v-on:form-submit-success="showContributionForm = false"></ContributionForm>
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
            v-for="term in filteredTerms"
            v-cloak
            class="sgds-card"
            :key="term.term"
            :style="{marginTop: '5px'}"
        >
            <div class="sgds-card-content">
                <div class="row">
                    <div class="col is-3">
                        <h6 class="margin--top is-uppercase">{{term.term}}</h6>
                    </div>
                    <div class="col is-9">
                        <p class="has-text-weight-bold">{{term.full_term}}</p>
                        <p>{{term.description}}</p>
                        <p v-if="term.link"><a :href="term.link">{{term.link}}</a></p>

                        <span class="categories" v-if="term.categories.length > 0">
                            <p class="has-text-weight-bold">Categories</p>
                            <ul>
                                <li v-for="(category, index) of term.categories" :key="category + index">
                                    {{category}}
                                </li>
                            </ul>
                        </span>
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
            searchBarStyle: {
                display: "flex"
            },
            contributeButtonContainerStyle: {
                display: "flex",
                flexDirection: "row-reverse"
            },
            contributionFormStyle: {
                padding: "1rem 0"
            }
        };
    },
    computed: {
        filteredTerms() {
            if (this.terms.length > 0) {
                return this.terms.filter(term => {
                    const searchLowercase = this.search.toLowerCase();
                    const termName = term.term.toLowerCase();
                    const fullTerm = term.full_term.toLowerCase();
                    const description = term.description.toLowerCase();
                    const link = term.link.toLowerCase();
                    return (
                        termName.indexOf(searchLowercase) !== -1 ||
                        fullTerm.indexOf(searchLowercase) !== -1 ||
                        description.indexOf(searchLowercase) !== -1 ||
                        link.indexOf(searchLowercase) !== -1 ||
                        term.category.indexOf(searchLowercase) !== -1
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
            this.terms = data;
        });
    }
};
</script>

<style scoped>
</style>
