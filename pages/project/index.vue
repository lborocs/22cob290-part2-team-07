<script setup lang="ts">
const { data: projects } = await useFetch("/api/projects")
</script>

<template>
	<ButtonNuxt
		v-for="project in projects"
		:key="project.uid"
		:to="`/project/${project.uid}`"
		icon="material-symbols:folder-outline-rounded"
		>{{ project.name }}</ButtonNuxt
	>
</template>

<style scoped lang="scss"></style>
