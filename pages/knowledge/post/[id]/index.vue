<script setup lang="ts">
defineProps<{
	post: Post
}>()
</script>

<template>
	<KnowledgePostMarkdown :markdown="post.markdown" :header-level="3" />
</template>

<style scoped lang="scss"></style>
