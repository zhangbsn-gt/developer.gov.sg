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
      style="color: #bdbdbd"
      v-else-if="!loading && blogs.length === 0"
    >
      There are no recent blog posts.
    </h3>

    <div
      v-else
      class="row"
      v-for="(feed, index) of blogsGroupedByFeedSortedFiltered"
      :key="feed.FeedTitle"
    >
      <div class="col blog-group">
        <hr v-if="index !== 0" />
        <header>
          <h3 class="has-text-weight-bold margin--bottom--none">
            {{ feed.FeedTitle }}
          </h3>
          <a
            :href="feed.FeedUrl"
            class="sgds-button is-outlined is-secondary"
            target="_blank"
            >More stories</a
          >
        </header>
        <p v-html="feed.FeedDescription" />
        <div class="card-grid-container grid-25rem">
          <div class="sgds-card" v-for="blog in feed.Blogs" :key="blog.ID">
            <div class="sgds-card-content sgds-card-variant-blog-info">
              <a :href="blog.Url" target="_blank"
                ><h5>{{ blog.Title }}</h5></a
              >
              <p class="is-size-8 has-text-left">
                Published on
                {{ format(blog.PubDate, "ccc, dd MMM yyyy") }} by
                {{ blog.Creator }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "../lib";
import { computed, ref, watch, onMounted } from "vue";
import { compareDesc, parseISO, format } from "date-fns";

function removeMediumSuffix(str) {
  return str.endsWith("- Medium") ? str.slice(0, -9) : str;
}

export default {
  setup() {
    const loading = ref(false);
    const blogs = ref([]);

    onMounted(() => {
      loading.value = true;
      apiClient
        .get("/blogs")
        .then(response => {
          blogs.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    });

    const blogsGroupedByFeed = computed(() => {
      return blogs.value.reduce((groupedBlogs, blog) => {
        blog = {
          ...blog,
          PubDate: parseISO(blog.PubDate),
        };
        let feedTitle = removeMediumSuffix(blog.FeedTitle);
        let feedDescription = removeMediumSuffix(blog.FeedDescription);
        if (groupedBlogs[feedTitle]) {
          groupedBlogs[feedTitle].Blogs = groupedBlogs[feedTitle].Blogs.concat([
            blog,
          ]);
          return groupedBlogs;
        }
        return {
          ...groupedBlogs,
          [feedTitle]: {
            FeedTitle: feedTitle,
            FeedUrl: blog.FeedUrl,
            FeedDescription: feedDescription,
            Blogs: [blog],
          },
        };
      }, {});
    });

    const blogsGroupedByFeedSortedFiltered = computed(() => {
      return Object.keys(blogsGroupedByFeed.value)
        .sort((a, b) => a.localeCompare(b))
        .map(key => {
          return {
            ...blogsGroupedByFeed.value[key],
            Blogs: blogsGroupedByFeed.value[key].Blogs.sort((a, b) =>
              compareDesc(a.PubDate, b.PubDate)
            ).slice(0, 3),
          };
        });
    });

    return {
      blogs,
      loading,
      blogsGroupedByFeed,
      blogsGroupedByFeedSortedFiltered,
    };
  },
  methods: {
    format,
  },
};
</script>

<style scoped>
.sgds-card {
  height: 100%;
}

.sgds-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.sgds-card:active {
  transform: translateY(0);
}
</style>
