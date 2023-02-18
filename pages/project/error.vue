<script setup lang="ts">
definePageMeta({
	name: "Invalid Project",
})
</script>

<template>
	<ProjectCard title="Project error" :text="false" class="error__card"
		><h2>ERROR: This project does not currently exist</h2></ProjectCard
	>
</template>

<style scoped lang="scss">
.error__card {
	margin: 0 auto;
}
</style>
