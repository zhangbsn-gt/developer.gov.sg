<template>
  <div id="blogs-app">
    <div v-if="loading" class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>

    <h3
      class="has-text-centered is-size-5"
      style="color: #bdbdbd;"
      v-else-if="noBlogsFetched && !loading"
    >
      There are no recent blog posts.
    </h3>

    <div v-else class="row" v-for="agency in allBlogs" :key="agency.name">
      <div class="col">
        <hr />
        <h3 class="has-text-weight-bold">{{ agency.name }}</h3>
        <p v-html="agency.description" />
        <div class="row">
          <div
            class="col is-4"
            v-for="blog in agency.blogEntries.slice(0, 3)"
            :key="blog.feedId"
          >
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
        <p class="has-text-weight-semibold is-size-8">
          Read more at the
          <a :href="agency.link.url" target="_blank">{{ agency.link.name }}</a>
        </p>
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
          name: "Data.gov.sg",
          description: `<strong>Data.gov.sg</strong> is a one-stop portal for access to the
  government’s publicly available data. It aims to make government data relevant
  and understandable using charts and articles.`,
          blogEntries: [],
          link: {
            url: "https://blog.data.gov.sg/",
            name: "Data.gov.sg Blog",
          },
        },
        {
          name: "Data Science & Artificial Intelligence Division",
          description: `The
  <strong>Data Science and Artificial Intelligence Division (DSAID) </strong
  >works with public agencies in using data science and AI to improve service
  delivery and policy outcomes.`,
          blogEntries: [],
          link: {
            url: "https://medium.com/dsaid-govtech",
            name: "DSAID Blog",
          },
        },
        {
          name: "Government Digital Services",
          description: `The <strong>Government Digital Service (GDS)</strong> delivers high-quality
  digital services to citizens and businesses in Singapore. They developed
  products such as Moments-of-Life and Business Grants Portal to name a few.`,
          blogEntries: [],
          link: {
            url: "https://blog.gds-gov.tech/",
            name: "Government Digital Services Blog",
          },
        },
        {
          name: "National Digital Identity",
          description: `The <strong>National Digital Identity (NDI)</strong> team develops and
  integrates solutions such as SingPass and MyInfo into a single platform. It is
  also a trusted digital platform for authentication, authorisation and consent.`,
          blogEntries: [],
          link: {
            url: "https://medium.com/ndi-sg/",
            name: "National Digital Identity Blog",
          },
        },
      ],
    };
  },
  created() {
    this.loading = true;
    apiClient
      .get("/blogs")
      .then((response) => {
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
    },
  },
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
