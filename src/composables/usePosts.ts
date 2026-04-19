import { ref, onMounted, type Ref } from 'vue';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import mdKatex from '@vscode/markdown-it-katex';
import { full as mdEmoji } from 'markdown-it-emoji';
import DOMPurify from 'dompurify';

const md = new MarkdownIt().use(mdKatex).use(mdEmoji);

export interface PostAttrs {
  date: string;
  tags: string[];
}
export interface Post {
  path: string;
  title: string;
  date: Date;
  tags: string[];
  body: string;
}

export function usePosts(): { posts: Ref<Post[]> } {
  const posts = ref<Post[]>([]);
  const postModules = import.meta.glob('../../posts/*.md', {
    query: '?raw',
    import: 'default',
  });

  onMounted(async () => {
    // This marks the time when the component is mounted but data might not be ready yet
    const laodStartTime = performance.now();

    const loadedPosts: Post[] = [];
    for (const [path, module] of Object.entries(postModules)) {
      const rawContent = await module();
      if (typeof rawContent !== 'string') continue;

      const { attributes, body } = fm<PostAttrs>(rawContent);

      loadedPosts.push({
        path: path.replace('../../posts/', '/post/').replace('.md', ''),
        title: body.match(/^#\s(.+)/)?.[1] || 'Untitled',
        date: new Date(attributes.date),
        tags: attributes.tags || [],
        body: body.replace(/^#\s(.+)\r?\n/, ''),
      });
    }
    // Sort posts by date in descending order
    posts.value = loadedPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // This marks the time when the component is mounted but data might not be ready yet
    const loadEndTime = performance.now();
    const loadTime = loadEndTime - laodStartTime;
    console.log(`Posts List Loading Time: ${loadTime.toFixed(2)} ms`);
  });

  return { posts };
}

export function renderMarkdown(content: string): string {
  return DOMPurify.sanitize(md.render(content));
}
