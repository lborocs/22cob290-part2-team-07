<script setup>
definePageMeta({
	name: "Project",
})

const projects = [
	{
		title: "Project 1",
		content: "This is the first project",
	},
]
</script>

<template>
	<p>The project page</p>
	<main>
		<div class="flex-row centre">
			<ProjectCard>
				<template #title>
					<h3>Project Progress</h3>
				</template>
				<template #largeContent>
					<ProjectSpinner />
				</template>
				<template #smallText>
					<p></p>
				</template>
				<template #footerText>
					<p>footer tex</p>
				</template>
			</ProjectCard>
		</div>
	</main>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

.flex-row {
	@extend %flex-row;
}

.centre {
	@extend %flex-centre;
}
</style>
