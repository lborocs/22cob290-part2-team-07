<script setup lang="ts">
const { markdown, headerLevel = 3 } = defineProps<{
	markdown: string
	headerLevel?: number
}>()

const showdown = useMarkdownConverter(headerLevel)
const markdownHTML = $computed(() => {
	return showdown.makeHtml(markdown)
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
}
</style>
