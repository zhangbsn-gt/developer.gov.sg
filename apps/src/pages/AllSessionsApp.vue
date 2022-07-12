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
              <span class="icon icon--checkLight" style="align-items: center">
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
        class="sgds-button"
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
            <p class="has-text-weight-semibold has-text-black">
              {{ key }}
            </p>
          </div>
          <!-- Content -->
          <div class="margin--sm">
            <div v-for="(item, index) in result" :key="index">
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
                <small>{{ item.timeslot }} / {{ item.category.type }} </small>
                <!-- Description-->
                <div
                  v-if="item.content"
                  class="margin--top--sm margin--bottom--sm"
                >
                  <small>{{ item.content }}</small>
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
import { convertDateForIos } from "../lib/communities";
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
        const unfilteredOptions = searchResults.value.map(item => {
          return item.timeslot_metadata.date;
        });

        // Sort the filtered options by date
        const sortedFilteredOptions = Array.from(
          new Set(unfilteredOptions)
        ).sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA - dateB;
        });

        // Set the active item to the first item in the sorted filtered options
        categorySelectedValues.value = sortedFilteredOptions[0];

        return sortedFilteredOptions;
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
            const dateA = convertDateForIos(a.timeslot_metadata.full_date);
            const dateB = convertDateForIos(b.timeslot_metadata.full_date);
            return dateA - dateB;
          });

        console.log(filteredOptions);

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
    });

    watch(pillSelectedValues, function (newValue) {
      pillSelectedValues.value = newValue;
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

      // After filtering the data, next we will sort the data by date
      const sortedFilteredSearchResult = filteredSearchResultByCategory.sort(
        (a, b) => {
          const dateA = convertDateForIos(a.timeslot_metadata.full_date);
          const dateB = convertDateForIos(b.timeslot_metadata.full_date);
          return dateA - dateB;
        }
      );

      // After sorting the data, aggregrate / group the data by the date
      const groupedFilteredSearchResult = sortedFilteredSearchResult.reduce(
        (acc, curr) => {
          const date = curr.timeslot_metadata.time;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(curr);
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

<style scoped></style>
