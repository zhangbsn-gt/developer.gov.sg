<template>
  <div>
    <!-- Loader -->
    <loader :active="isLoading" />
    <!-- Content-->
    <div class="sgds-container search-content" v-show="!isLoading">
      <!-- Count -->
      <p class="search-result-status">
        {{
          `Showing ${
            filteredSearchResults.sanitizedSortedFilteredSearchResults.length >
            0
              ? filteredSearchResults.sanitizedSortedFilteredSearchResults
                  .length
              : totalPages
          } out of ${totalPages} results`
        }}
      </p>
      <!-- Status -->
      <h6 class="is-danger" v-if="errorMsg">{{ errorMsg }}</h6>
      <!-- Results -->
      <div class="card-grid-container is-fullwidth">
        <div
          :key="result.url"
          class="sgds-card-list"
          v-for="result of filteredSearchResults.sanitizedSortedFilteredSearchResults"
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
                          {{ result.calendarFormat.dayFormat }}
                        </p>
                      </div>
                      <div class="padding--bottom--none">
                        <p class="padding--bottom--none">
                          {{ result.calendarFormat.monthFormat }}&nbsp;‘
                          {{ result.calendarFormat.yearFormat }}
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
                    result.calendarFormat.dayFormat +
                    " " +
                    result.calendarFormat.monthFormat +
                    " " +
                    result.calendarFormat.yearFormat
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
                <!-- Display event's description -->
                <p v-html="result.description"></p>
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
import { sanitize } from "../lib/index.js";
import { computed } from "@vue/composition-api";
import CardCalendar from "../lib/CardCalendar.vue";
import useLunrSearch from "../composables/useLunrSearch";
import { getEventDataByDate, convertDateForIos } from "../lib/communities";

export default {
  components: { Loader, CardCalendar },
  setup() {
    // Variables
    const params = new URLSearchParams(window.location.search);
    const { queryParam, dateParam, categoryParam } = {
      queryParam: sanitize(params.get("query")),
      dateParam: params.get("year_filter")
        ? sanitize(params.get("year_filter"))
        : "All Time",
      categoryParam: params.get("category_filter")
        ? sanitize(params.get("category_filter"))
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
        "category",
        "content",
        "random",
      ],
    });

    const filteredSearchResults = computed(() => {
      // Check if param is empty
      const queryIsEmpty = !queryParam || /^\s*$/.test(queryParam);

      // Adding extra attributes that is used during the filtering process, such as the date
      const processedSearchResults = searchResults.value.map(item => {
        const date = convertDateForIos(item.event_date_raw);
        const { status, backgroundColor } = getEventDataByDate(item.event_date);

        return {
          ...item,
          date: date,
          calendarFormat: {
            dayFormat:
              date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            monthFormat:
              window.innerWidth < 1025
                ? date.toLocaleString("en-SG", { month: "long" })
                : date
                    .toLocaleString("en-SG", { month: "short" })
                    .toUpperCase(),
            yearFormat: date
              .getFullYear()
              .toString()
              .substr(window.innerWidth < 1025 ? 0 : -2),
          },
          status: status.toUpperCase(),
          backgroundColor: backgroundColor,
        };
      });

      // Filtering out the results based on the date filter and category filter
      const filteredSearchResults = processedSearchResults
        .filter(item => {
          if (dateParam === "All Time") {
            return true;
          }

          return item.date.getFullYear() === parseInt(dateParam);
        })
        .filter(item => {
          const trimmedCategoryParam = categoryParam.trim().toLocaleLowerCase();
          if (trimmedCategoryParam === "all types") {
            return true;
          }

          return item.category.trim().toLowerCase() === trimmedCategoryParam;
        });

      // If param is emtpy, perform a sort using event's time, else return full obj
      const sortedFilteredSearchResults = queryIsEmpty
        ? filteredSearchResults.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateB - dateA;
          })
        : filteredSearchResults;

      const sanitizedSortedFilteredSearchResults =
        sortedFilteredSearchResults.map(item => {
          return {
            ...item,
            title: sanitize(item.title),
            description: sanitize(item.description),
            category: sanitize(item.category),
            content: sanitize(item.content),
          };
        });

      const postProcessedNumberOfResults =
        sanitizedSortedFilteredSearchResults.length;

      return {
        processedSearchResults,
        filteredSearchResults,
        postProcessedNumberOfResults,
        sanitizedSortedFilteredSearchResults,
      };
    });

    document.getElementById("query-all-year").value = dateParam;
    document.getElementById("query-all-events").value = queryParam;
    document.getElementById("query-all-category").value = categoryParam;

    return {
      totalPages,
      isLoading,
      isNonEmptySearch,
      searchResults,
      errorMsg,
      filteredSearchResults,
    };
  },
};
</script>
