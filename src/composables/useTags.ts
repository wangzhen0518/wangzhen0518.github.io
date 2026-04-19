import { computed } from 'vue';
import { usePosts } from './usePosts';

export function useTags() {
  const { posts } = usePosts();

  const tags = computed(() => {
    const allTags = posts.value.flatMap((post) => post.tags);
    return [...new Set(allTags)];
  });

  return { tags };
}
