<template>
  <div id="blogs-app">
    <div
      class="row"
      v-if="this.gdsBlogs.length===0 && this.datagovBlogs.length===0 && this.ndiBlogs.length===0"
    >
      <div class="col">
        <h3
          class="has-text-centered is-size-5"
          style="color: #bdbdbd;"
        >There are no recent blog posts.</h3>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <div class="col">
          <h3 class="has-text-weight-bold">Government Digital Services</h3>
          <div class="row">
            <div class="col is-4" v-for="blog in this.gdsBlogs.slice(0, 3)">
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
            <a
              href="https://blog.gds-gov.tech/"
              target="_blank"
            >Government Digital Services Blog</a>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h3 class="has-text-weight-bold">Government Open Data</h3>
          <div class="row">
            <div class="col is-4" v-for="blog in this.datagovBlogs.slice(0, 3)">
              <a :href="blog.url" target="_blank">
                <div class="sgds-card sgds-card-button">
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
            <a href="https://blog.data.gov.sg/" target="_blank">Data.gov.sg Blog</a>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h3 class="has-text-weight-bold">National Digital Identity</h3>
          <div class="row">
            <div class="col is-4" v-for="blog in this.ndiBlogs.slice(0, 3)">
              <a :href="blog.url" target="_blank">
                <div class="sgds-card sgds-card-button">
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
            <a
              href="https://medium.com/ndi-sg/"
              target="_blank"
            >National Digital Identity Blog</a>
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
      allBlogs: [],
      gdsBlogs: [],
      datagovBlogs: [],
      ndiBlogs: []
    };
  },
  methods: {
    // methods
  },
  created() {
    this.loading = true;
    apiClient
      .get("/blogs")
      .then(response => {
        this.allBlogs = response.data;
        this.gdsBlogs = this.allBlogs[0].gdsBlogs;
        this.datagovBlogs = this.allBlogs[0].datagovBlogs;
        this.ndiBlogs = this.allBlogs[0].ndiBlogs;
      })
      .finally(() => {
        this.loading = false;
      });
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
