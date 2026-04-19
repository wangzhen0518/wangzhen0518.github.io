<template>
  <div>
    <h1>Search Results for "{{ query }}"</h1>
    <PostList v-if="searchResults.length" :posts="searchResults" />
    <p v-else>No results found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePosts } from '../composables/usePosts';
import { computed } from 'vue';
import PostList from '../components/PostList.vue';

const route = useRoute();
const { posts } = usePosts();
const query = computed(() => route.query.q as string);

const searchResults = computed(() => {
  if (!query.value) return [];
  return posts.value.filter((post) => {
    const lowerCaseQuery = query.value.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.body.toLowerCase().includes(lowerCaseQuery)
    );
  });
});
</script>
