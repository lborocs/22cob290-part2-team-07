<script setup lang="ts">
definePageMeta({
	name: "Invalid User",
})
</script>

<template>
	<ProjectCard title="User Error" :text="false" class="error__card"
		><h2>ERROR: This user does not currently exist</h2></ProjectCard
	>
</template>

<style scoped lang="scss">
.error__card {
	margin: 0 auto;
}
</style>
