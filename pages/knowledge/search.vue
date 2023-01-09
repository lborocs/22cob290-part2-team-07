<script setup lang="ts">
definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()

let query = ref(route.query)
const { data: posts } = await useFetch("/api/search/post", {
	query: query,
})
watch(route, () => {
	query.value = route.query
})
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
