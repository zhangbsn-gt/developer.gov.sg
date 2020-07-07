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
      v-else-if="!loading && blogs.length === 0"
    >
      There are no recent blog posts.
    </h3>

    <div
      v-else
      class="row"
      v-for="feed of blogsGroupedByFeedSortedFiltered"
      :key="feed.FeedTitle"
    >
      <div class="col">
        <hr />
        <h3 class="has-text-weight-bold">{{ feed.FeedTitle }}</h3>
        <p v-html="feed.FeedDescription" />
        <div class="row">
          <div class="col is-4" v-for="blog in feed.Blogs" :key="blog.ID">
            <a :href="blog.Url" target="_blank">
              <div class="sgds-card">
                <div class="sgds-card-content">
                  <h5>{{ blog.Title }}</h5>
                  <p class="is-size-8 has-text-weight-light has-text-left">
                    Published on
                    {{ format(blog.PubDate, "ccc, dd MMM yyyy") }} by
                    {{ blog.Creator }}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <p class="has-text-weight-semibold is-size-8">
          Read more at
          <a :href="feed.FeedUrl" target="_blank">{{ feed.FeedTitle }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { compareDesc, parseISO, format } from "date-fns";
import { apiClient } from "../lib";

export default {
  data() {
    return {
      loading: false,
      allBlogs: [
        {
          name: "Cyber Security Group",
          description: `<strong>Cyber Security Group (CSG)</strong> is the cybersecurity arm of GovTech
            and is committed to creating a safe and secure digital government.`,
          blogEntries: [],
          link: {
            url: "https://medium.com/csg-govtech",
            name: "Cyber Security Group Blog",
          },
        },
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
          description: `The <strong>Government Digital Service (GDS)</strong> team delivers high-quality
            digital services to citizens and businesses in Singapore. They have developed
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
            integrates solutions such as SingPass and MyInfo into a single platform. NDI is
            also a trusted digital platform for authentication, authorisation and consent.`,
          blogEntries: [],
          link: {
            url: "https://medium.com/ndi-sg/",
            name: "National Digital Identity Blog",
          },
        },
      ],
      blogs: [],
    };
  },
  created() {
    this.loading = true;
    apiClient
      .get("/blogs")
      .then((response) => {
        this.blogs = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    blogsGroupedByFeed() {
      return this.blogs.reduce((groupedBlogs, blog) => {
        blog = {
          ...blog,
          PubDate: parseISO(blog.PubDate),
        };
        if (groupedBlogs[blog.FeedTitle]) {
          groupedBlogs[blog.FeedTitle].Blogs = groupedBlogs[
            blog.FeedTitle
          ].Blogs.concat([blog]);
          return groupedBlogs;
        }
        return {
          ...groupedBlogs,
          [blog.FeedTitle]: {
            FeedTitle: blog.FeedTitle,
            FeedUrl: blog.FeedUrl,
            FeedDescription: blog.FeedDescription,
            Blogs: [blog],
          },
        };
      }, {});
    },
    blogsGroupedByFeedSortedFiltered() {
      return Object.keys(this.blogsGroupedByFeed)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => {
          return {
            ...this.blogsGroupedByFeed[key],
            Blogs: this.blogsGroupedByFeed[key].Blogs.sort((a, b) =>
              compareDesc(a.PubDate, b.PubDate)
            ).slice(0, 3),
          };
        });
    },
  },
  methods: {
    format,
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
