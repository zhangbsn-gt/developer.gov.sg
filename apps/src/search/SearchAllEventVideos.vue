<template>
  <div>
    <!-- Loader -->
    <loader :active="isLoading" />
    <div v-show="!isLoading">
      <!-- Search and filter-->
      <div class="spacing-container-horizontal spacing-16 margin--bottom--sm">
        <strong class="label-text-to-hide">Filter list: </strong>
        <form
          name="form"
          style="flex: auto"
          class="search-box-defined-width row"
          action=""
          method="get"
        >
          <div class="col">
            <div class="field">
              <div class="control has-icons-right is-expanded">
                <input
                  id="query-all-tracks"
                  class="input is-fullwidth"
                  type="text"
                  name="query"
                  autocomplete="off"
                  placeholder="Search tracks"
                />
                <span class="icon is-right">
                  <i
                    class="search-bar-icon sgds-icon sgds-icon-search is-size-7"
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col is-4">
            <div class="field">
              <div class="control has-icons-right is-expanded is-fullwidth">
                <select
                  id="query-all-category"
                  class="input"
                  name="tag_filter"
                  autocomplete="off"
                  v-model="categorySelectedValues"
                >
                  <option
                    :key="index"
                    :value="option"
                    v-for="(option, index) in categoryOptions.value"
                  >
                    {{ option }}
                  </option>
                </select>
                <span class="icon is-right">
                  <i
                    class="search-bar-icon sgds-icon sgds-icon-chevron-down is-size-7"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- Count -->
      <div>
        <p class="margin--top margin--bottom text-muted">
          Showing {{ filteredResult.totalFilteredResults }} out of
          {{ totalPages }} recordings
        </p>
        <!-- Status -->
        <h6 class="is-danger" v-if="errorMsg">{{ errorMsg }}</h6>
      </div>
      <!-- Results -->
      <div class="card-grid-container is-fullwidth">
        <div
          :key="key"
          v-for="(item, key) in filteredResult.sanitizedFilteredSearchResult"
        >
          <div class="sgds-card sgds-card-variant-video-info">
            <div class="sgds-card-content">
              <div class="content-grid">
                <div class="sgds-card-image">
                  <figure class="sgds-image">
                    <figure class="sgds-image">
                      <a :href="item.url">
                        <img
                          alt="stack video thumbnail"
                          :src="item.video_image"
                        />
                      </a>
                    </figure>
                  </figure>
                </div>
                <div class="info">
                  <!-- Title with link-->
                  <h4>
                    <a
                      :href="item.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="sgds-card-content-event-title"
                      v-html="item.title"
                    >
                    </a>
                  </h4>
                  <!-- Categories -->
                  <div class="is-flex" v-if="item.categories">
                    <div
                      :key="index"
                      v-for="(category, index) in item.categories"
                      class="is-hidden-touch has-text-weight-semibold padding--left--sm padding--right--sm is-size-8 margin--top--sm margin--bottom--sm margin--right--sm"
                      style="
                        background-color: #cce4f7;
                        width: fit-content;
                        border-radius: 0.1rem;
                        padding: 0.4rem;
                        border-radius: 0.25rem;
                      "
                    >
                      <span v-html="category"></span>
                    </div>
                  </div>
                  <!-- Description (optional) -->
                  <p
                    :v-if="item.description"
                    :v-html="item.description"
                    id="sgds-card-content-event-description"
                  ></p>
                  <!-- Speakers -->
                  <p>
                    <strong>Speaker(s):</strong>
                    <br />
                    <span
                      v-for="(speaker, index) in item.speakers"
                      :key="index"
                    >
                      <strong v-text="speaker.name"></strong>,
                      <span v-text="speaker.title"></span>
                      <br />
                      <br />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../lib/Card.vue";
import Loader from "../lib/Loader.vue";
import { sanitize, isQueryEmpty } from "../lib/index.js";
import useLunrSearch from "../composables/useLunrSearch";
import { computed, onMounted, ref, watch } from "@vue/composition-api";

export default {
  components: { Loader, Card },
  setup() {
    // Variables
    const scriptElement = document.querySelector(
      'script[data-id="search-all-event-videos"]'
    );

    const { jsonPath } = scriptElement.dataset;

    const categoryOptions = ref([]);
    const categorySelectedValues = ref("");

    const params = new URLSearchParams(window.location.search);
    const { queryParam, categoryParam } = {
      queryParam: sanitize(params.get("query")),
      categoryParam: sanitize(params.get("tag_filter")),
    };

    // Function
    const initialiseCategoryValues = () => {
      categoryOptions.value = computed(() => {
        // Note: we are using pages as the ref so as to not have the processed results via the search
        // Extract out all the categories found within the search results
        const unfilteredOptions = pages.value.map(item => {
          return item.categories;
        });

        // Remove duplicates [[a, b], [b, c]] => [a, b, c]
        const filteredOptions = Array.from(new Set(unfilteredOptions.flat()));

        // Sort the options by first occurence -> i.e. item in a comes before item in b where item is the id
        const sortedFilteredOptions = filteredOptions.sort((a, b) => {
          const indexA = parseInt(a.video_index);
          const indexB = parseInt(b.video_index);

          return indexA - indexB;
        });

        // Add Option, "All Tags" which will be the default selected value
        const finalSortedFilteredOptions = [
          "All Tags",
          ...sortedFilteredOptions,
        ];

        // If categoryParam exist, use it, else fallback on the current selected val, else fall back on default
        categorySelectedValues.value = categorySelectedValues.value
          ? categorySelectedValues.value
          : categoryParam
          ? categoryParam
          : "All Tags";
        return finalSortedFilteredOptions;
      });
    };

    const initialiseFormInputvalues = () => {
      if (queryParam)
        document.getElementById("query-all-tracks").value = queryParam;
    };

    // Search
    const {
      searchQuery,
      pages,
      lunrSearchResults,
      isLoading,
      isNonEmptySearch,
      searchResults,
      totalPages,
      generateSearchResults,
      errorMsg,
    } = useLunrSearch();

    generateSearchResults({
      queryParam: queryParam,
      jsonPath: jsonPath,
      lunrIndexFields: ["type", "title", "description", "content"],
    });

    onMounted(() => {
      initialiseCategoryValues();
      initialiseFormInputvalues();
    });

    watch(categorySelectedValues, function (newValue) {
      categorySelectedValues.value = newValue;
    });

    const filteredResult = computed(() => {
      // Check if param is empty
      const queryIsEmpty = isQueryEmpty(queryParam);

      // If param is emtpy, perform a sort using video_index (order of data.yaml), else return full obj
      const initialSearchResults = queryIsEmpty
        ? searchResults.value.sort((a, b) => {
            const indexA = parseInt(a.video_index);
            const indexB = parseInt(b.video_index);

            return indexA - indexB;
          })
        : searchResults.value;

      // Use category to filter
      const filteredSearchResult = initialSearchResults.filter(item => {
        switch (true) {
          case categorySelectedValues.value === "All Tags":
            return true;
          case item.categories.length === 0:
            return false;
          case item.categories.includes(categorySelectedValues.value):
            return true;
        }
      });

      const sanitizedFilteredSearchResult = filteredSearchResult.map(item => {
        return {
          ...item,
          title: sanitize(item.title),
          description: sanitize(item.description),
          content: sanitize(item.content),
        };
      });

      const totalFilteredResults = filteredSearchResult.length;

      return {
        filteredSearchResult,
        totalFilteredResults,
        sanitizedFilteredSearchResult,
      };
    });

    return {
      searchQuery,
      pages,
      lunrSearchResults,
      isLoading,
      isNonEmptySearch,
      searchResults,
      totalPages,
      errorMsg,
      filteredResult,
      categoryOptions,
      categorySelectedValues,
    };
  },
};
</script>
