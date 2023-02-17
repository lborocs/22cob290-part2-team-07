<script setup lang="ts">
import { Project } from "@prisma/client"
definePageMeta({
	name: "Dashboard",
})
const { data: tasks } = useFetch("/api/tasks")
const { data: projects } = useFetch("/api/projects")
</script>

<template>
	<TaskSwitcher v-if="tasks" :tasks="tasks" />

	<section class="card" v-if="projects">
		<h2>My Projects</h2>
		<div class="grid-wrap">
			<ProjectListItem
				v-for="project in projects"
				:key="project.uid"
				:project="project"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
.grid-wrap {
	display: grid;
	--card-small-min-width: 22ch;
	grid-template-columns: repeat(
		auto-fill,
		minmax(var(--card-small-min-width), 1fr)
	);
	gap: 0.5rem;
}
</style>
