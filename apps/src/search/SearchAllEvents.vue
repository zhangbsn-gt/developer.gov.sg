<template>
  <div>
    <loader :active="isLoading" />
    <div class="sgds-container search-content" v-show="!isLoading">
      <p class="search-result-status">
        {{
          `Showing ${
            filterSearchResults.preProcessedNumberOfResults > 0
              ? filterSearchResults.postProcessedNumberOfResults
              : 0
          } out of ${filterSearchResults.preProcessedNumberOfResults} results`
        }}
      </p>
      <h6 class="is-danger" v-if="errorMsg">{{ errorMsg }}</h6>
      <div class="card-grid-container is-fullwidth">
        <div
          class="sgds-card-list"
          v-for="result of filterSearchResults.processedResults"
          :key="result.url"
        >
          <CardCalendar>
            <!-- Event Status -->
            <template v-slot:event-status>
              <div
                :style="{ backgroundColor: result.backgroundColor }"
                class="is-hidden-desktop has-text-centered has-text-white has-text-weight-semibold padding--bottom--sm padding--top--sm"
              >
                {{ result.status }}
              </div>
            </template>
            <!-- Calendar -->
            <template v-slot:calendar>
              <div class="sgds-card-image is-hidden-touch">
                <div class="margin--right--lg">
                  <div class="has-text-centered" style="width: 6.65rem">
                    <div
                      class="event-status-container"
                      style="
                        border-top-right-radius: 0.5rem;
                        border-top-left-radius: 0.5rem;
                      "
                      :style="{ backgroundColor: result.backgroundColor }"
                    >
                      <p
                        class="is-size-8 has-text-weight-bold has-text-white event-status margin--bottom--none"
                      >
                        {{ result.status }}
                      </p>
                    </div>
                    <div
                      class="padding---top--xs"
                      style="
                        border: 1px solid #323232;
                        border-bottom-left-radius: 0.5rem;
                        border-bottom-right-radius: 0.5rem;
                      "
                    >
                      <div class="padding--top--sm padding--bottom--sm">
                        <p
                          class="padding--top--sm padding--bottom--xs margin--bottom--none is-size-2 has-text-weight-bold has-text-centered"
                        >
                          {{ result.dayFormat }}
                        </p>
                      </div>
                      <div class="padding--bottom--none">
                        <p class="padding--bottom--none">
                          {{ result.monthFormat }}&nbsp;‘
                          {{ result.yearFormat }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- Header -->
            <template v-slot:header>
              <h4>
                <a :href="result.url" v-html="result.title"></a>
              </h4>
            </template>
            <!-- Mobile Calendar Slot -->
            <template v-slot:mobile-calender>
              <div class="is-hidden-desktop is-flex is-centered">
                <p
                  class="is-flex margin--bottom--sm"
                  style="align-items: center"
                >
                  <span
                    class="sgds-icon sgds-icon-calendar is-size-4 margin--right--sm"
                    role="img"
                    aria-label="iconName"
                    style="-webkit-text-stroke: 0.5px white"
                  ></span>
                  {{
                    result.dayFormat +
                    " " +
                    result.monthFormat +
                    " " +
                    result.yearFormat
                  }}
                </p>
              </div>
            </template>
            <!-- Recording Slot -->
            <template v-slot:recording>
              <div
                v-if="result.event_recording_link !== 'false'"
                class="is-hidden-touch has-text-weight-semibold padding--left--sm padding--right--sm margin--bottom margin--top padding--top--sm padding--bottom--sm is-size-8"
                style="
                  background-color: #cce4f7;
                  width: fit-content;
                  border-radius: 0.1rem;
                  border-radius: 0.25rem;
                "
              >
                Recordings available
              </div>
            </template>
            <!-- Category Slot-->
            <template v-slot:category>
              <div class="is-flex" style="filter: contrast(0.25)">
                <img
                  alt="Event Image"
                  class="margin--right--sm margin--left--none margin--bottom--none margin--top--none"
                  style="width: 1.5em; height: 1.5em"
                  :src="result.icon_path"
                />
                <p v-html="result.category"></p>
              </div>
            </template>
            <!-- Front matter attributes -->
            <template v-slot:front-matter-attributes>
              <div class="spacing-container-vertical spacing-16">
                <div
                  v-if="result.targetGroup !== ''"
                  class="spacing-container-vertical spacing-8"
                >
                  <strong>Target Group</strong>
                  <p v-html="result.targetGroup"></p>
                </div>
                <!-- Display event's description -->
                <div class="">
                  <p v-html="result.description"></p>
                </div>
              </div>
            </template>
          </CardCalendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../lib/Loader.vue";
import CardCalendar from "../lib/CardCalendar.vue";
import useLunrSearch from "../composables/useLunrSearch";
import { computed } from "@vue/composition-api";
import { getEventDataByDate, convertDateForIos } from "../lib/communities";

export default {
  components: { Loader, CardCalendar },
  setup() {
    // Variables
    const params = new URLSearchParams(window.location.search);
    const { queryParam, dateParam, categoryParam } = {
      queryParam: params.get("query"),
      dateParam: params.get("year_filter")
        ? params.get("year_filter")
        : "All Time",
      categoryParam: params.get("category_filter")
        ? params.get("category_filter")
        : "All Types",
    };

    const {
      isLoading,
      totalPages,
      isNonEmptySearch,
      searchResults,
      generateSearchResults,
      errorMsg,
    } = useLunrSearch();

    generateSearchResults({
      queryParam: queryParam,
      jsonPath: "/search/events.json",
      lunrIndexFields: [
        "title",
        "description",
        "targetGroup",
        "category",
        "random",
      ],
    });

    document.getElementById("query-all-year").value = dateParam;
    document.getElementById("query-all-events").value = queryParam;
    document.getElementById("query-all-category").value = categoryParam;

    const filterSearchResults = computed(() => {
      // Processing fixed-varied variables for the search results, such as dateParams and categoryParams
      const preProcessedNumberOfResults = searchResults.value.length;
      for (let i = 0; i < searchResults.value.length; i++) {
        const result = searchResults.value[i];

        // Result specific
        const category = result.category;
        const date = convertDateForIos(result.event_date_raw);
        const { status, backgroundColor } = getEventDataByDate(
          result.event_date
        );

        // PRE PROCESSING
        // Processing fixed-varied variables for the search results, such as dateParams and categoryParams
        // if they do not match the search results, then remove the result from the search results
        // afterwards, skip the loop and start the next iteration
        if (dateParam !== "All Time") {
          if (dateParam != date.getFullYear()) {
            searchResults.value.splice(i, 1);
            i--;
            continue;
          }
        }

        if (categoryParam !== "All Types") {
          if (
            categoryParam.trim().toLowerCase() !== category.trim().toLowerCase()
          ) {
            searchResults.value.splice(i, 1);
            i--;
            continue;
          }
        }

        // POST PROCESSING
        result.status = status.toUpperCase();
        result.backgroundColor = backgroundColor;
        result.dayFormat =
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        result.monthFormat =
          window.innerWidth < 1025
            ? date.toLocaleString("en-SG", { month: "long" })
            : date.toLocaleString("en-SG", { month: "short" }).toUpperCase();
        result.yearFormat =
          window.innerWidth < 1025
            ? date.getFullYear().toString()
            : date.getFullYear().toString().substr(-2);
      }

      const postProcessedNumberOfResults = searchResults.value.length;
      return {
        preProcessedNumberOfResults: preProcessedNumberOfResults,
        postProcessedNumberOfResults: postProcessedNumberOfResults,
        processedResults: searchResults.value,
      };
    });

    return {
      totalPages,
      isLoading,
      isNonEmptySearch,
      searchResults,
      errorMsg,
      filterSearchResults,
    };
  },
};
</script>
