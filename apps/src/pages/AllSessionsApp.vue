<template>
  <div>
    <!-- Day Filter Single Select-->
    <div>
      <form
        name="form"
        style="flex: auto"
        class="search-box-defined-width row"
        action=""
        method="get"
      >
        <div class="field col padding--right--none">
          <div class="control has-icons-right is-expanded is-fullwidth">
            <select
              class="input"
              id="query-all-category"
              autocomplete="off"
              v-model="categorySelectedValues"
            >
              <option
                v-for="(option, index) in categoryOptions.value"
                :key="index"
                :value="option"
              >
                Day {{ index + 1 }} ({{ option }})
              </option>
            </select>
            <span class="icon is-right is-flex">
              <i
                class="search-bar-icon sgds-icon sgds-icon-chevron-down is-size-7"
              ></i>
            </span>
          </div>
        </div>
      </form>
    </div>
    <!-- Categorical Multi Select -->
    <div>
      <div class="margin--top">
        <template v-for="(option, index) in pillCheckboxOptions.value">
          <label
            :key="index"
            class="pilllist-item"
            v-if="
              filteredResult.categorySpecificToDay.includes(
                option.category.type
              )
            "
          >
            <input
              type="checkbox"
              name="feature"
              :value="option.category.type"
              v-model="pillSelectedValues"
            />
            <span class="pilllist-label is-flex" style="align-items: center">
              <img
                :src="option.category.icon"
                class="margin--bottom--none margin--left--none margin--right--sm"
              />
              {{ option.category.type }}
              <span
                class="pilllist-icon pilllist-icon--checkLight"
                style="align-items: center"
              >
                <i
                  class="sgds-icon sgds-icon-check margin--bottom--none is-size-7"
                  role="img"
                  aria-label="iconName"
                ></i>
              </span>
            </span>
          </label>
        </template>
      </div>
    </div>
    <!-- Clear all Filter -->
    <div>
      <button
        type="button"
        class="sgds-button padding--left--none padding--right--none padding--top--none padding--bottom--none"
        @click="clearAllFilters"
        style="border: none; color: #007aff"
      >
        Clear All Filters
      </button>
    </div>
    <!-- Results -->
    <div class="margin--top">
      <div
        v-for="(result, key) of filteredResult.groupedFilteredSearchResult"
        class="margin--bottom--sm"
        :key="key"
      >
        <div class="is-borderless">
          <!-- Header -->
          <div class="sgds-accordion-header is-active" style="border: 0px">
            <div class="is-flex" style="align-items: center">
              <p
                class="has-text-weight-semibold has-text-black margin--bottom--none margin--right--sm"
              >
                {{ key }}
              </p>
              <small
                v-if="result.isBannerActive"
                class="blink small-rounded-corner has-background-success has-text-white padding--left--sm padding--right--sm padding--top--xs padding--bottom--xs"
              >
                Now
              </small>
            </div>
          </div>
          <!-- Content -->
          <div class="margin--sm">
            <div v-for="(item, index) in result.events" :key="index">
              <div
                class="sgds-card-variant-all-agenda-content margin--top--sm margin--left--xs margin--right--xs padding--sm has-text-dark"
              >
                <!-- Title and Icon-->
                <div>
                  <div class="is-flex" style="align-items: center">
                    <img
                      :src="item.category.icon"
                      class="margin--right--sm margin--left--none margin--bottom--none margin--top--none"
                    />
                    <p
                      class="is-size-5 has-text-weight-bold margin--bottom--xs"
                    >
                      {{ item.title }}
                    </p>
                  </div>
                </div>
                <!-- Time and category-->
                <small
                  >{{ item.timeslot_metadata.start_time }} -
                  {{ item.timeslot_metadata.end_time }} /
                  {{ item.category.type }}
                </small>
                <!-- Description-->
                <div
                  v-if="item.content"
                  class="margin--top--sm margin--bottom--sm"
                >
                  <small v-html="item.content"></small>
                </div>
                <!-- Speakers -->
                <div v-for="(speaker, index) in item.speakers" :key="index">
                  <p class="muted margin--bottom--none">
                    <small v-if="Object.keys(speaker).length">
                      {{ speaker.name }}, {{ speaker.title }}
                    </small>
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
import useLunrSearch from "../composables/useLunrSearch";
import { computed, ref, watch, onMounted } from "@vue/composition-api";

export default {
  components: { Loader, Card },
  setup() {
    // Variables
    const scriptElement = document.querySelector(
      'script[data-id="all-agenda-page"]'
    );

    const { jsonPath } = scriptElement.dataset;

    // Inital rerender to true
    const rerender = ref(true);
    const categorySelectedValues = ref("");
    const categoryOptions = ref([]);
    const pillSelectedValues = ref([]);
    const pillCheckboxOptions = ref([]);

    // Functions
    const clearAllFilters = () => {
      const filteredSearchResult = searchResults.value.filter(item =>
        item.timeslot_metadata.date.includes(categorySelectedValues.value)
      );

      // Get all the categories found within filteredSearchResult
      const categories = new Set(
        filteredSearchResult.map(item => item.category.type)
      );

      // Remove values in pillSelectedValues found in categories
      pillSelectedValues.value = pillSelectedValues.value.filter(
        item => !categories.has(item)
      );
    };

    const initialiseCategoryValues = () => {
      categoryOptions.value = computed(() => {
        // Sort by date
        const unfilteredSortedSearchResult = searchResults.value.sort(
          (a, b) => {
            const dateA = new Date(a.timeslot_metadata.start_date);
            const dateB = new Date(b.timeslot_metadata.start_date);
            return dateA - dateB;
          }
        );

        // Get unique dates
        const filteredSortedSearchResult = Array.from(
          new Set(
            unfilteredSortedSearchResult.map(item => {
              return item.timeslot_metadata.date;
            })
          )
        );

        // Set the active item to the first item in the sorted filtered options
        categorySelectedValues.value = filteredSortedSearchResult[0];

        return filteredSortedSearchResult;
      });
    };

    const initialisePillCheckboxValues = () => {
      pillCheckboxOptions.value = computed(() => {
        const unfilteredOptions = searchResults.value.map(item => {
          return {
            category: item.category,
            timeslot_metadata: item.timeslot_metadata,
          };
        });

        // Get distinct and unique values from unfileredOptions
        // note, category is an array of objects, such as [{type: "category1"}, {icon: "/assets/icons/circle.svg"}]
        const filteredOptions = unfilteredOptions
          .reduce((acc, curr) => {
            if (!acc.find(item => item.category.type === curr.category.type)) {
              acc.push(curr);
            }
            return acc;
          }, [])
          .sort((a, b) => {
            const dateA = new Date(a.timeslot_metadata.start_date);
            const dateB = new Date(b.timeslot_metadata.start_date);
            return dateA - dateB;
          });

        // Spread the filtered options into an array of strings
        const stringFilteredOptions = filteredOptions.map(item => {
          return item.category.type;
        });

        pillSelectedValues.value = stringFilteredOptions;

        return filteredOptions;
      });
    };

    // Search
    const {
      searchQuery,
      isLoading,
      isNonEmptySearch,
      searchResults,
      generateSearchResults,
      errorMsg,
    } = useLunrSearch();

    generateSearchResults({
      queryParam: "",
      jsonPath: jsonPath,
      lunrIndexFields: [],
    });

    onMounted(() => {
      initialiseCategoryValues();
      initialisePillCheckboxValues();
    });

    watch(categorySelectedValues, function (newValue) {
      categorySelectedValues.value = newValue;
      rerender.value = true;
    });

    watch(pillSelectedValues, function (newValue) {
      pillSelectedValues.value = newValue;
      rerender.value = true;
    });

    const filteredResult = computed(() => {
      // Filter based on categoryOptions
      const filteredSearchResult = searchResults.value.filter(item =>
        item.timeslot_metadata.date.includes(categorySelectedValues.value)
      );

      // Filter based on pillSelectedValues, which is an array of strings against category.type
      const filteredSearchResultByCategory = filteredSearchResult.filter(item =>
        pillSelectedValues.value.includes(item.category.type)
      );

      // Add extra attribute to the filteredSearchResultByCategory, isActive, which is used to display whether the event is currently active or not
      let iterations = filteredSearchResultByCategory.length;
      const filteredSearchResultByCategoryWithActive =
        filteredSearchResultByCategory.map(item => {
          if (rerender.value) {
            if (!isLoading.value && !--iterations) {
              rerender.value = false;
            }

            const currentDate = new Date();
            const startDate = new Date(item.timeslot_metadata.start_date);
            const endDate = new Date(item.timeslot_metadata.end_date);

            const isActive = currentDate >= startDate && currentDate <= endDate;
            return {
              ...item,
              isActive,
            };
          } else {
            return item;
          }
        });

      // After filtering the data, next we will sort the data by date
      const sortedFilteredSearchResult =
        filteredSearchResultByCategoryWithActive.sort((a, b) => {
          const dateA = new Date(a.timeslot_metadata.start_date);
          const dateB = new Date(b.timeslot_metadata.start_date);

          return dateA - dateB;
        });

      // After sorting the data, aggregrate / group the data by the date
      const groupedFilteredSearchResult = sortedFilteredSearchResult.reduce(
        (acc, curr) => {
          const date = curr.timeslot_metadata.start_time;
          if (!acc[date]) {
            acc[date] = { events: [], isBannerActive: false };
          }

          acc[date].events.push(curr);

          if (curr.isActive) {
            acc[date].isBannerActive = true;
          }
          return acc;
        },
        {}
      );

      // Generate the categories that are unique to the categorySelectedValues.value using filteredSearchResult against pillCheckboxOptions
      const categorySpecificToDay = filteredSearchResult
        .map(item => {
          return item.category.type;
        })
        .filter((item, index, array) => {
          return array.indexOf(item) === index;
        });

      return {
        filteredResult,
        sortedFilteredSearchResult,
        groupedFilteredSearchResult,
        categorySpecificToDay,
      };
    });

    // Every 20 seconds, set rerender to true, which will trigger the computed function to re-render the data
    // this is because rerendering is expensive and shouldnt always be triggered
    setInterval(() => {
      rerender.value = true;
    }, 20 * 1000);

    return {
      searchQuery,
      isLoading,
      isNonEmptySearch,
      searchResults,
      errorMsg,
      filteredResult,
      categorySelectedValues,
      categoryOptions,
      pillSelectedValues,
      pillCheckboxOptions,
      clearAllFilters,
    };
  },
};
</script>

<style scoped>
.small-rounded-corner {
  border-radius: 0.2em;
}
</style>
