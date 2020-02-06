<template>
  <div id="blogs-app">
    <div class="row" v-if="noBlogsFetched && !loading">
      <div class="col">
        <h3
          class="has-text-centered is-size-5"
          style="color: #bdbdbd;"
        >There are no recent blog posts.</h3>
      </div>
    </div>

    <div v-else>
      <div class="row" v-for="agency in allBlogs">
        <div class="col">
          <h3 class="has-text-weight-bold">{{ agency.name }}</h3>
          <div class="row">
            <div class="col is-4" v-for="blog in agency.blogEntries.slice(0, 3)" :key="blog.feedId">
              <a :href="blog.url" target="_blank">
                <div class="sgds-card">
                  <div class="sgds-card-content">
                    <h5>{{ blog.title }}</h5>
                    <p class="is-size-8 has-text-weight-light has-text-left">
                      Published on
                      {{ blog.pubDate | moment("ddd, D MMM YYYY") }} by
                      {{ blog.creator }}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <p class="has-text-weight-semibold has-text-right is-size-8">
            Read more at the
            <a :href="agency.link.url" target="_blank">{{ agency.link.name }}</a>
          </p>
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
      loading: false,
      allBlogs: [
        {
          name: "Government Digital Services",
          blogEntries: [],
          link: {
            url: "https://blog.gds-gov.tech/",
            name: "Government Digital Services Blog"
          }
        },
        {
          name: "Data.gov.sg",
          blogEntries: [],
          link: {
            url: "https://blog.data.gov.sg/",
            name: "Data.gov.sg Blog"
          }
        },
        {
          name: "National Digital Identity",
          blogEntries: [],
          link: {
            url: "https://medium.com/ndi-sg/",
            name: "National Digital Identity Blog"
          }
        },
        {
          name: "Data Science & Artificial Intelligence Division",
          blogEntries: [],
          link: {
            url: "https://medium.com/dsaid-govtech",
            name: "DSAID Blog"
          }
        }
      ]
    };
  },
  created() {
    this.loading = true;
    apiClient
      .get("/blogs")
      .then(response => {
        this.allBlogs[0].blogEntries = response.data.gdsBlogs;
        this.allBlogs[1].blogEntries = response.data.datagovBlogs;
        this.allBlogs[2].blogEntries = response.data.ndiBlogs;
        this.allBlogs[3].blogEntries = response.data.dsaidBlogs;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    noBlogsFetched() {
      return (
        this.allBlogs[0].blogEntries.length === 0 &&
        this.allBlogs[1].blogEntries.length === 0 &&
        this.allBlogs[2].blogEntries.length === 0 &&
        this.allBlogs[3].blogEntries.length === 0
      );
    }
  }
};
</script>

<style scoped>
.sgds-card {
  background-image: url("/assets/img/bg-memphispattern.png");
  color: #ffffff;
  height: 100%;
}

.sgds-card:hover {
  transform: translateY(-2px);
  box-shadow: 2px 3px 5px gray;
  transition: all 0.3s;
}

.sgds-card:active {
  transform: translateY(0);
}
</style>
