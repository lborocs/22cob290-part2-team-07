<script setup lang="ts">
definePageMeta({
	name: "Invalid Client",
})
</script>

<template>
	<ProjectCard title="Client Error" :text="false" class="error__card"
		><h2>ERROR: This client does not currently exist</h2></ProjectCard
	>
</template>

<style scoped lang="scss">
.error__card {
	margin: 0 auto;
}
</style>
