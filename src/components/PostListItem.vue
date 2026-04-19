<template>
  <router-link :to="post.path" class="post-link">
    <div class="post-list-item">
      <h2 class="post-title">{{ post.title }}</h2>
      <div class="post-tags">
        <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`" class="tag-link">
          {{ tag }}
        </router-link>
      </div>
      <p class="post-date">{{ date }}</p>
      <p class="post-content" v-html="content"></p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { renderMarkdown, type Post } from '../composables/usePosts';
import { formatDate } from '../utils/formatDate';

const props = defineProps<{ post: Post }>();

const charLimit = 1024;
const date = computed(() => formatDate(props.post.date));
const content = computed(() => {
  let content = props.post.body;
  if (content.length > charLimit) {
    content = content.substring(0, charLimit);
  }
  return renderMarkdown(content);
});
</script>

<style scoped>
.post-list-item {
  display: flex;
  flex-direction: column;
  height: 280px; /* Or any height you prefer */
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.post-list-item:hover {
  border-color: var(--color-accent);
}

.post-link {
  text-decoration: none;
  color: var(--color-heading);
}

.post-title {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.post-date {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.post-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
