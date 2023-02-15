<template>
	<section class="card">
		<h2>Projects Overview</h2>
		<div class="grid-wrapper projects-wrapper">
			<ProjectManagerOverview
				v-for="project in visibleProjects"
				:key="project.uid"
				:project="project"
			/>
		</div>
	</section>

	<section class="card">
		<h2>Employees Overview</h2>
	</section>
</template>

<style scoped lang="scss">
.grid-wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50ch, 1fr));
	grid-gap: 1rem;
}
</style>

<script setup lang="ts">
import { Project, Task } from "@prisma/client"
definePageMeta({
	name: "Manager Dashboard",
})

const visibleProjects = ref<(Project & { tasks: KanbanTask[] })[]>([])
getVisibleProjects()

async function getVisibleProjects() {
	const res = await $fetch("/api/projects")
	console.log(res)
	for (let uid of res.map((p: Project) => p.uid)) {
		const { data: project } = await useFetch(`/api/project/${uid}`)
		console.log(project.value)
		visibleProjects.value.push(project.value)

		// visibleProjects.value.push(wholeProject)
	}
}
</script>
