<template>
  <div class="post-view" v-if="post">
    <h1 class="post-title">{{ post.title }}</h1>
    <div class="post-tags">
      <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`" class="tag-link">
        {{ tag }}
      </router-link>
    </div>
    <p class="post-date">{{ date }}</p>
    <div class="post-content" v-html="content"></div>
  </div>
  <div v-else>
    <p>Post not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { renderMarkdown, usePosts, type Post } from '../composables/usePosts';
import { ref, watchEffect, computed } from 'vue';
import { formatDate } from '../utils/formatDate';

const route = useRoute();
const { posts } = usePosts(); // Get the global posts array
const post = ref<Post | undefined>();

watchEffect(() => {
  if (posts.value.length) {
    const postId = route.params.id;
    post.value = posts.value.find((p) => p.path.endsWith(postId as string));
  }
});

const content = computed(() => renderMarkdown(post.value?.body || ''));
const date = computed(() => formatDate(post.value?.date || new Date()));
</script>

<style scoped>
.post-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.post-date {
  margin-bottom: 2rem;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.post-content :deep(p) {
  margin-bottom: 1em;
}

.post-content :deep(code) {
  background-color: var(--color-background-soft);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.post-content :deep(pre) {
  background-color: var(--color-background-soft);
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
}

.post-content :deep(pre) code {
  padding: 0;
  background-color: transparent;
}
</style>
