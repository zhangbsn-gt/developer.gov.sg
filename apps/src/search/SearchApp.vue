<template>
  <section class="sgds-section">
    <div
      :style="{ display: 'flex', justifyContent: 'center' }"
      v-if="searching"
    >
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>

    <div class="sgds-container search-content" v-if="!searching">
      <h2 class="margin--bottom">
        {{
          searchQuery
            ? `Search results for: "${searchQuery}"`
            : `Search for anything here!`
        }}
      </h2>
      <div class="card-grid-container grid-25rem">
          <div class="sgds-card" 
          v-for="result of searchResults"
          :key="`${result.ref}`"
          >
            <div class="sgds-card-content">
              <p class="title">
                <a :href="result.url">{{ result.title }}</a>
              </p>
              <p v-html="result.displayedContent"></p>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import axios from "axios";
import lunr from "lunr";
import { escapeRegExp } from "../lib";
export default {
  data() {
    return {
      searchQuery: "",
      pages: [],
      lunrSearchResults: [],
      searching: false
    };
  },
  methods: {
    getSearchContentDisplay(searchResult) {
      let contentLength = 500; // characters
      let matchKey = Object.keys(searchResult.matchData.metadata)[0];

      if (searchResult.matchData.metadata[matchKey].content) {
        // Start 32 characters left of first match
        // Unless first match index < 32
        let matchPositions =
          searchResult.matchData.metadata[matchKey].content.position;
        let firstMatchIndex = matchPositions[0][0];

        let truncatedContent = firstMatchIndex > 32 ? "..." : "";
        truncatedContent += searchResult.content.substring(
          firstMatchIndex - 32,
          firstMatchIndex + contentLength
        );
        if (firstMatchIndex + contentLength < searchResult.content.length) {
          truncatedContent += "...";
        }
        return this.highlightContentMatches(truncatedContent);
      }
      return "";
    },
    highlightContentMatches(content) {
      return content.replace(
        new RegExp(`${escapeRegExp(this.searchQuery)}`, "gi"),
        `<strong>${this.searchQuery}</strong>`
      );
    }
  },
  computed: {
    searchResults() {
      return this.lunrSearchResults.map(lunrResult => {
        let associatedPage = this.pages.find(
          page => page.url === lunrResult.ref
        );
        let searchResult = {
          ...associatedPage,
          ...lunrResult
        };
        return {
          ...searchResult,
          displayedContent: this.getSearchContentDisplay(searchResult)
        };
      });
    }
  },
  created() {
    let u = new URL(window.location.href);
    this.searchQuery = u.searchParams.get("query");
    if (!this.searchQuery) return;
    this.searching = true;
    axios
      .get("/search/pages.json")
      .then(response => {
        let pagesRaw = response.data.pages;
        let pagesNonEmpty = pagesRaw
          .filter(page => Object.keys(page).length !== 0)
          .map(page => {
            return {
              ...page,
              content: page.content.replace(/\s+/g, " ")
            };
          });
        this.pages = pagesNonEmpty;
        // Build lunr index
        const lunrIndex = lunr(function() {
          this.ref("url");
          this.field("content");
          this.field("category");
          this.field("title");
          this.metadataWhitelist = ["position"];
          pagesNonEmpty.forEach(function(page) {
            this.add(page);
          }, this);
        });
        if (
          this.searchQuery &&
          this.searchQuery.length > 0 &&
          this.searchQuery.trim() !== ""
        ) {
          this.lunrSearchResults = lunrIndex.search(this.searchQuery);
        } else {
          this.searchQuery = "";
        }
      })
      .finally(() => {
        this.searching = false;
      });
  }
};
</script>
