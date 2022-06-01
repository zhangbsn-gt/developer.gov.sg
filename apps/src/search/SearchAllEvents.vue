<template>
  <div>
    <loader :active="isLoading" />
    <div class="sgds-container search-content" v-show="!isLoading">
      <p class="search-result-status">
        {{
          `Showing ${
            filterSearchResults.length > 0 ? filterSearchResults.length : 0
          } out of ${totalPages}`
        }}
      </p>
      <h6 class="is-danger" v-if="errorMsg">{{ errorMsg }}</h6>
      <div class="card-grid-container is-fullwidth">
        <div
          class="sgds-card-list"
          v-for="result of filterSearchResults"
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
                  <div class="has-text-centered" style="width: 6.65rem;">
                    <div
                      class="event-status-container"
                      style="border-top-right-radius: 0.5rem; border-top-left-radius: 0.5rem;"
                      :style="{ backgroundColor: result.backgroundColor }"
                    >
                      <p
                        class="has-text-weight-bold has-text-white margin--bottom--none"
                      >
                        {{ result.status }}
                      </p>
                    </div>
                    <div
                      class="padding---top--xs"
                      style="border: 1px solid #323232; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem;"
                    >
                      <div class="padding--top--sm padding--bottom--sm">
                        <p
                          class="padding--top--sm padding--bottom--xs margin--bottom--none is-size-2 has-text-weight-bold has-text-centered"
                        >
                          {{ result.desktopDateFormat.dayFormat }}
                        </p>
                      </div>
                      <div class="padding--bottom--none">
                        <p class="padding--bottom--none">
                          {{ result.desktopDateFormat.monthFormat }}&nbsp;‘
                          {{ result.desktopDateFormat.yearFormat }}
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
                  style="align-items: center;"
                >
                  <span
                    class="sgds-icon sgds-icon-calendar is-size-5 margin--right--sm"
                    role="img"
                    aria-label="iconName"
                    style="-webkit-text-stroke: .5px white;"
                  ></span>
                  {{
                    result.mobileDateFormat.dayFormat +
                      " " +
                      result.mobileDateFormat.monthFormat +
                      " " +
                      result.mobileDateFormat.yearFormat
                  }}
                </p>
              </div>
            </template>
            <!-- Recording Slot -->
            <template v-if="result.event_recording_link" v-slot:recording>
              <div
                class="is-hidden-touch has-text-weight-semibold padding--left--sm padding--right--sm margin--bottom margin--top padding--top--sm padding--bottom--sm is-size-8"
                style="background-color: #CCE4F7; width: fit-content; border-radius: 0.1rem; border-radius: .25rem;"
              >
                Recordings available
              </div>
            </template>
            <!-- Category Slot-->
            <template v-slot:category>
              <div class="is-flex">
                <img
                  alt="Event Image"
                  class="margin--right--sm margin--left--none margin--bottom--none margin--top--none"
                  style="width: 1.5em; height: 1.5em;"
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
import { getEventDataByDate } from "../lib/communities";

export default {
  components: { Loader, CardCalendar },
  setup() {
    let queryParam = new URL(window.location.href).searchParams.get("query");
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
        "content",
        "random",
      ],
    });

    document.getElementById("query-all-events").value = queryParam;

    return {
      totalPages,
      isLoading,
      isNonEmptySearch,
      searchResults,
      errorMsg,
    };
  },
  computed: {
    filterSearchResults: function() {
      const dateParam = new URL(window.location.href).searchParams.get(
        "year_filter"
      )
        ? new URL(window.location.href).searchParams.get("year_filter")
        : "All Time";
      const categoryParam = new URL(window.location.href).searchParams.get(
        "category_filter"
      )
        ? new URL(window.location.href).searchParams.get("category_filter")
        : "All Types";

      document.getElementById("query-all-year").value = dateParam;
      document.getElementById("query-all-category").value = categoryParam;

      for (var i = 0; i < this.searchResults.length; i++) {
        const dt = new Date(this.searchResults[i].event_date_raw);
        const { status, backgroundColor } = getEventDataByDate(
          this.searchResults[i].event_date
        );

        this.searchResults[i].status = status.toUpperCase();
        this.searchResults[i].backgroundColor = backgroundColor;
        this.searchResults[i].desktopDateFormat = {
          dayFormat: dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate(),
          monthFormat: dt
            .toLocaleString("en-SG", {
              month: "short",
            })
            .toUpperCase(),
          yearFormat: dt
            .getFullYear()
            .toString()
            .substr(-2),
        };
        this.searchResults[i].mobileDateFormat = {
          dayFormat: dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate(),
          monthFormat: dt.toLocaleString("en-SG", { month: "long" }),
          yearFormat: dt.getFullYear().toString(),
        };
      }

      return this.searchResults
        .filter((node) => {
          // Converts the date in the page's front matter to a date object then to full years
          const eventDateInYears = new Date(node.event_date_raw).getFullYear();
          // If no specified date (by param), just return ignore and return everything as it is
          if (dateParam === "All Time") {
            return true;
          }
          // If there is a targetted / specific year the user wants, then provide filtering
          if (eventDateInYears == dateParam) {
            return true;
          }
        })
        .filter((node) => {
          if (categoryParam === "All Types") {
            return true;
          }
          if (
            node.category.trim().toLowerCase() ===
            categoryParam.trim().toLowerCase()
          ) {
            return true;
          }
        });
    },
  },
};
</script>