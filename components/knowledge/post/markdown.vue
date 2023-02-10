<script setup lang="ts">
const { markdown, headerLevel = 3 } = defineProps<{
	markdown: string
	headerLevel?: number
}>()

const DEFAULT_MARKDOWN = `# Title

## Subtitle

Interesting content
- Bullet Point 1
- Bullet Point 2
- Bullet Point 3
`

const showdown = useMarkdownConverter(headerLevel)
const markdownHTML = $computed(() => {
	if (markdown) return showdown.makeHtml(markdown)
	return showdown.makeHtml(DEFAULT_MARKDOWN)
})
</script>

<template>
	<div class="markdown-html" v-html="markdownHTML" />
</template>

<style lang="scss">
@use "~/assets/core";

.markdown-html {
	a {
		@extend %link;
	}
	img {
		width: 100%;
	}
}
</style>
