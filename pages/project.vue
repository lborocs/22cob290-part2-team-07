<script setup>
definePageMeta({
	name: "Project",
})

const projectToggle = ref(false)

const projects = [
	{
		title: "Project 1",
		content: "This is the first project",
	},
	{
		title: "Project 2",
		content: "This is the second project",
	},
	{
		title: "Project 3",
		content: "This is the third project",
	},
	{
		title: "Project 4",
		content: "This is the fourth project",
	},
	{
		title: "Project 5",
		content: "This is the fifth project",
	},
]
</script>

<template>
	<p>The project page</p>

	<button @click="projectToggle = !projectToggle">Show/hide projects</button>

	<p>Currently hide is {{ projectToggle }}</p>

	<div class="project-container">
		<ProjectCard
			v-for="project in projects"
			:title="project.title"
			:content="project.content"
			:class="{ hide: projectToggle }"
		/>
	</div>
</template>

<style scoped lang="scss">
.project-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}

.hide {
	display: none;
}
</style>
