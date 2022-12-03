<script setup lang="ts">
definePageMeta({
	name: "Project",
})

const projects = [
	{
		title: "Project 1",
		content: "This is the first project",
	},
]

const { data: tasks } = useFetch("/api/tasks", { default: () => [] as Task[] })

// Set project deadline date
function setProjectDeadlineDate() {
	const projectDeadlineDate = new Date()
	const projectDeadlineDateFormatted = projectDeadlineDate.toLocaleDateString(
		"en-gb",
		{
			day: "numeric",
			month: "long",
			year: "numeric",
		},
	)

	// Commented to avoid annoying typescript error

	// document.querySelector("#project-deadline").innerHTML =
	// 	projectDeadlineDateFormatted

	// document.querySelector("#days-remaining").innerHTML =
	// 	dateDiffInDays(new Date(), projectDeadlineDate) + " days remaining"
}

// Display days left until project deadline
function dateDiffInDays(a: any, b: any) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

	return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

// setProjectDeadlineDate()
</script>

<template>
	<p>The project page</p>
	<main>
		<section class="flex-row centre">
			<ProjectCard :text="false">
				<template #title>
					<h3>Project Progress</h3>
				</template>
				<template #largeContent>
					<ProjectSpinner />
				</template>
				<template #smallText> </template>
			</ProjectCard>

			<ProjectCard :text="true">
				<template #title>
					<h3>Project deadline</h3>
				</template>
				<template #smallText>
					<p id="project-deadline">12th December 2021</p>
					<p id="days-remaining">5 days remaining</p>
				</template>
			</ProjectCard>

			<ProjectCard :text="true">
				<template #title>
					<h3>Team leader</h3>
				</template>
				<template #largeContent>
					<img
						src="https://ui-avatars.com/api/?name=Firat Batmaz&background=random&size=50&format=svg"
						alt="Team leader"
					/>
				</template>
				<template #smallText>
					<p>Firat Batmaz</p>
				</template>
			</ProjectCard>

			<ProjectCard :text="true">
				<template #title>
					<h3>Client details</h3>
				</template>
				<template #largeContent>
					<img
						src="https://ui-avatars.com/api/?name=Loughborough University&background=random&size=50&format=svg"
						alt="Team leader"
					/>
				</template>
				<template #smallText>
					<p>Loughborough University</p>
				</template>
			</ProjectCard>
		</section>

		<section>
			<KanbanBoard :tasks="tasks!" />
		</section>
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
