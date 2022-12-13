<script setup lang="ts">
definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()

async function search() {
	return (await useFetch("/api/search/post", { query: route.query })).data
}

const posts = await search()
watch(route, async () => {
	posts.value = (await search()).value
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
