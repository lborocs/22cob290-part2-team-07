<script setup lang="ts">
definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()
const { data: posts } = await useFetch("/api/posts")
</script>

<template>
	<KnowledgeSearchbar id="searchbar" />
	<KnowledgePostSnippet v-for="post in posts" :key="post.uid" v-bind="post" />
</template>

<style scoped lang="scss">
@use "~/assets/mobile";

#searchbar {
	@media (max-width: mobile.$width) {
		width: 100%;
	}
}
</style>
