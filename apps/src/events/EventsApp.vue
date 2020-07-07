<template>
  <div id="events-app">
    <div class="spinner" v-if="loading">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div v-if="!loading">
      <h3
        v-if="events.length === 0"
        class="has-text-centered is-size-5"
        style="color: #bdbdbd;"
      >
        There are
        <a href="https://www.meetup.com/STACK-X-by-GovTech-Singapore/"
          >no {{ eventType }} events.</a
        >
      </h3>
      <div
        class="row event-container"
        v-for="event of sortedEvents"
        :key="event.id"
      >
        <div
          class="col is-4"
          style="display: flex; justify-content: center; align-items: center;"
        >
          <img
            :src="event.featured_photo.photo_link"
            :alt="`featured photo for ${event.name}`"
          />
        </div>
        <div class="col is-8">
          <h3 class="event-name">
            <a :href="event.link" target="_blank">{{ event.name }}</a>
          </h3>
          <p>{{ event.time | moment("ddd, MMM D YYYY, h A") }}</p>
          <p class="event-description">{{ event.plain_text_description }}</p>
          <a :href="`https://maps.google.com/?q=${event.venue.name}`">
            <small>
              <span class="sgds-icon sgds-icon-my-location"></span>
              {{ event.venue.name }}
            </small>
          </a>
          <p><a :href="event.link">Find out more</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "../lib";
export default {
  props: {
    eventType: {
      type: String,
    },
  },
  data() {
    return {
      events: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    apiClient
      .get("/events?eventStatus=" + this.eventType)
      .then((response) => {
        this.events = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    sortedEvents() {
      return this.events.sort((a, b) => b.time - a.time);
    },
  },
};
</script>

<style scoped>
.event-description {
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.event-container {
  margin-bottom: 4rem;
}
.event-container img {
  margin-bottom: 0;
}
</style>
