<script setup lang="ts">
definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()

const topic = ref<Topic>()

watchEffect(async () => {
	const response = await $fetch(`/api/topic/${route.query.topic}`)
	topic.value = response
})
</script>

<template>
	<KnowledgeSearchbar id="searchbar" />
	<h3>Query: {{ $route.query.q }}</h3>
	<h3>Topic: {{ topic?.name }}</h3>
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
