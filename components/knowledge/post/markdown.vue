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
	<div v-html="markdownHTML" />
</template>

<style scoped lang="scss"></style>
