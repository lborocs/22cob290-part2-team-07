<script setup lang="ts">
definePageMeta({
	name: "Dashboard",
})
const { data: tasks } = useFetch("/api/tasks", { default: () => [] as Task[] })
const { data: projects } = useFetch("/api/projects", {
	default: () => [] as Project[],
})
</script>

<template>
	<TaskSwitcher v-if="tasks" :tasks="tasks" />

	<section class="card grid-wrap" v-if="projects">
		<h2>My Projects</h2>
		<div
			class="project-details card-small"
			v-for="project in projects"
			:key="project.uid"
		>
			<h3>{{ project.name }}</h3>
		</div>
	</section>
</template>

<style scoped lang="scss"></style>
