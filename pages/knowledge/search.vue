<script setup lang="ts">
definePageMeta({
	name: "Knowledge Search Results",
})
</script>

<template>
	<KnowledgeSearchbar />
	<h3>Query: {{ $route.query.q }}</h3>
	<h3>Topic: {{ $route.query.topic }}</h3>
</template>

<style scoped lang="scss"></style>
