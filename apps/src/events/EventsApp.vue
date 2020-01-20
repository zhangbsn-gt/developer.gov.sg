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
      <div class="row event-container" v-for="event of events" :key="event.id">
        <div
          class="col is-4"
          style="display: flex; justify-content: center; align-items: center; margin-right: 2rem;"
        >
          <img
            :src="event.featured_photo.photo_link"
            :alt="`featured photo for ${event.name}`"
          />
        </div>
        <div class="col">
          <h3 class="event-name">
            {{ event.name }}
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
  data() {
    return {
      events: [],
      loading: false
    };
  },
  created() {
    this.loading = true;
    apiClient
      .get("/events")
      .then(response => {
        this.events = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
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
.event-container .event-name {
  font-weight: bold;
}
</style>
