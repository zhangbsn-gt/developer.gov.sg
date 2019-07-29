<template>
    <div id="events-app">
        <h2>Meetup.com events</h2>
        <div class="spinner" v-if="loading">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        <div class="sgds-container" v-if="!loading">
            <div class="sgds-card" v-for="event of events" :key="event.id">
                <div class="sgds-card-content">
                    <h3>{{ event.name }}</h3>
                    <a :href="event.link">{{ event.link }}</a>
                    <p>
                        <span class="sgds-icon sgds-icon-calendar"></span>
                        {{ event.time | moment("dddd, MMMM D, YYYY") }}
                    </p>
                    <p>
                        <a :href="`https://google.com/search?q=${event.venue.address_1}`">
                            <span class="sgds-icon sgds-icon-my-location"></span>
                            {{ event.venue.name }}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            events: null,
            loading: false
        };
    },
    created() {
        this.loading = true;
        axios
            .get("/.netlify/functions/api/events")
            .then(response => {
                this.events = response.data;
            })
            .finally(() => {
                this.loading = false;
            });
    }
};
</script>
