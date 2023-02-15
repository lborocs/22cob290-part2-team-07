<template>
	<section class="card">
		<header class="flex-row">
			<h2>Projects Overview</h2>
			<Button icon="material-symbols:add">New Project</Button>
		</header>
		<div class="grid-wrapper projects-wrapper">
			<ProjectManagerOverview
				v-for="uid in visibleProjects"
				:key="uid"
				:uid="uid"
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
header {
	justify-content: space-between;
}
</style>

<script setup lang="ts">
import { Project, Task, User, Subtask, Client } from "@prisma/client"

definePageMeta({
	name: "Manager Dashboard",
})

const visibleProjects = ref<number[]>([])
getVisibleProjects()

async function getVisibleProjects() {
	const res = await $fetch("/api/projects")
	console.log(res)
	for (let uid of res.map((p: Project) => p.uid)) {
		visibleProjects.value.push(uid)
	}
}
</script>
