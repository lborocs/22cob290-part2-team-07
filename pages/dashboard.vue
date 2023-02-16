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

	<section class="card grid-wrap" v-if="projects">
		<h2>My Projects</h2>
		<div
			class="project-details card-small"
			v-for="project in projects"
			:key="project.uid"
		>
			<ProjectListItem :project="project" />
		</div>
	</section>
</template>

<style scoped lang="scss"></style>
