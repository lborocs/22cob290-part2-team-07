<script setup lang="ts">
import { Icon } from "@iconify/vue"
definePageMeta({
	name: "Knowledge",
})
</script>

<template>
	<div>
		<h4>Search</h4>
		<h3>Make-It-All</h3>
		<KnowledgeSearchbar />
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";

div {
	@include core.flex($wrap: false);
	@include core.centre;
	top: 45%;
	box-sizing: border-box;
	width: 100%;
}

h3 {
	color: var(--colour-accent);
	font-size: 3em;
	margin: 0;
	margin-bottom: 1rem;
}

h4 {
	font-size: 2.5em;
	margin: 0;
}
</style>
