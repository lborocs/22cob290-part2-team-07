<script setup>
definePageMeta({
	name: "Project",
})

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

	<div class="flex-row flex-centre">
		<ProjectCard v-for="project in projects">
			<template #title>
				<h3>{{ project.title }}</h3>
			</template>
			<template #smallText>
				<p>{{ project.content }}</p>
			</template>
			<template #footerText>
				<p>footer text</p>
			</template>
		</ProjectCard>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
</style>
