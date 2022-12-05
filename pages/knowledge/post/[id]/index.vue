<script setup lang="ts">
const route = useRoute()
const { data: post } = await useFetch(`/api/post/${route.params.id}`)
</script>

<template>
	<p>Post: {{ $route.params.id }}</p>
	<KnowledgePostMarkdown
		v-if="post"
		:markdown="post.markdown"
		:header-level="2"
	/>
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
