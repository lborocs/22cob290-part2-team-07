<script setup lang="ts">
definePageMeta({
	name: "Knowledge",
})
</script>

<template>
	<div>
		<h2>Search</h2>
		<h3>Make-It-All</h3>
		<KnowledgeSearchbar id="searchbar" />
		<ButtonNuxt
			to="/knowledge/faq"
			icon="material-symbols:question-mark-rounded"
			>FAQ</ButtonNuxt
		>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";

div {
	@extend %flex-col, %flex-centre, %centre;
	top: 45%;
	box-sizing: border-box;
	width: 100%;
	font-size: 1.25em;
}

h3 {
	color: var(--colour-accent);
	font-size: 3em;
	margin: 0;
	margin-bottom: 1rem;
}

h2 {
	font-size: 2.5em;
	margin: 0;
}
</style>
