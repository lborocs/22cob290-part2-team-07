<script setup lang="ts">
definePageMeta({
	name: "Knowledge Search Results",
})
</script>

<template>
	<KnowledgeSearchbar id="searchbar" />
	<h3>Query: {{ $route.query.q }}</h3>
	<h3>Topic: {{ $route.query.topic }}</h3>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";

#searchbar {
	font-size: 0.7em;
	width: 70%;
	@media (max-width: mobile.$width) {
		width: 100%;
	}
}
</style>
