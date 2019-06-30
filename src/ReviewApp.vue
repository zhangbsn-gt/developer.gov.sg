<template>
    <div id="review">
        <div class="row has-text-centered">
            <div class="col">
                <label for="search-input">
                    <h5>Review Product Contents</h5>
                </label>
            </div>
        </div>
        <div class="row" style="min-height: 50vh">
            <div class="col">
                <a class="sgds-button is-rounded is-fullwidth" @click="performSSO">Login with Github</a>
            </div>
        </div>
    </div>
    <!--
        <div id="terms">
            <div class="row has-text-centered">
                <div class="col">
                    <label for="search-input">
                        <h5>Singapore Government Technology Acronyms</h5>
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="sgds-accordion">
                        <div class="sgds-accordion-set">
                            <a class="sgds-accordion-header" v-on:click="showContributionForm = !showContributionForm">
                                Suggest a new acronym <i class="sgds-icon sgds-icon-chevron-down"></i>
                            </a>
                            <div class="sgds-accordion-body has-background-light">
                                <div v-if="showContributionForm" :style="contributionFormStyle">
                                    <ContributionForm type="add" @close="showContributionForm = false"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="control has-icons-left">
                        <input
                                type="text"
                                id="search-input"
                                class="input"
                                placeholder="Search Acronym"
                                v-model="search"
                        >
                        <span class="icon"><i class="sgds-icon sgds-icon-search is-size-6 search-bar"></i></span>
                    </div>
                </div>
            </div>
            <div
                v-for="term of filteredTerms"
                v-cloak
                class="sgds-card margin--bottom--sm"
                :key="term.id + term.term"
            >
                <div class="sgds-card-content">
                    <div class="row">
                        <div class="col is-3 is-paddingless">
                            <h6 class="margin--top is-uppercase">{{term.term}}</h6>
                        </div>
                        <div class="col is-9 is-paddingless">
    
                            <p class="has-text-weight-bold">{{term.full_term}}</p>
                            <p>{{term.description}}</p>
    
                            <div v-if="term.categories.length > 0">
                                Tags:
                                <span class="sgds-tag is-rounded margin--right--sm" v-for="category of term.categories" :key="term.term + category">
                                    {{category}}
                                </span>
                            </div>
    
                            <div v-if="term.links.length > 0" class="margin--top">
                                <a :href="link" target="_blank" v-for="link of term.links" :key="term.term + link">
                                    Link <span class="sgds-icon sgds-icon-external"></span>
                                </a>
                            </div>
    
                        </div>
                    </div>
                    <div class="row">
                        <div class="col has-text-right is-paddingless">
                            <a href @click.prevent="editTerm(term.id)">
                                Edit
                                <i class="sgds-icon sgds-icon-chevron-down" v-if="!editing[term.id]"></i>
                                <i class="sgds-icon sgds-icon-chevron-up" v-else></i>
                            </a>
                        </div>
                    </div>
                    <div class="has-background-light padding" v-if="editing[term.id]">
                        <ContributionForm
                                type="edit"
                                @close="editing[term.id] = false"
                                :termId="term.id"
                                :term="term.term"
                                :full_term="term.full_term"
                                :description="term.description"
                                :links="term.links"
                                :tags="term.categories"
                        />
                    </div>
                </div>
            </div>
        </div>
        -->
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            page_content: null
        };
    },
    methods: {
        performSSO() {
          console.log('clicked');
          axios.get("/.netlify/functions/api/auth/github", {});
        }
    }
};
</script>
