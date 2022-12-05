<script setup lang="ts">
definePageMeta({
	name: "Project",
})

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
	<main>
		<section class="flex-row">
			<ProjectCard title="Project Progress" :text="false">
				<ProjectSpinner />
			</ProjectCard>
			<ProjectCard title="Project Deadline" :text="true">
				<p id="project-deadline" class="deadline">12th December 2021</p>
				<p id="days-remaining" class="deadline-days">5 days remaining</p>
			</ProjectCard>
			<ProjectCard title="Project Lead" :text="true">
				<!-- <img
					src="https://ui-avatars.com/api/?name=Firat Batmaz&background=random&size=150&format=svg"
					alt="Team leader"
					class="profile-pic"
				/> -->
				<UserIcon :uid="1" name="Firat Batmaz" :size="150" />
				<p>Firat Batmaz</p>
			</ProjectCard>
			<ProjectCard title="Project Client" :text="true">
				<UserIcon :uid="1" name="Loughborough University" :size="150" />
				<p>Loughborough University</p>
			</ProjectCard>
		</section>

		<section class="card">
			<TaskSwitcher :tasks="tasks!" />
		</section>

		<section class="card"></section>
	</main>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

.flex-row {
	@extend %flex-row;
	justify-content: center;
	flex-wrap: nowrap;
}

.centre {
	@extend %flex-centre;
}

.card-small-image {
	aspect-ratio: 1;
	border-radius: 100vh;
	width: 8rem;
	height: 8rem;
	margin: 1rem 0 1rem 0;
}

.deadline {
	font-size: 3rem;
	font-weight: 500;
	margin: 0 auto; /* top right bottom left */
	text-align: center;
	/* margin-top: 3rem;
  margin-bottom: 1rem; */

	&-days {
		font-size: 1.25rem;
		font-weight: 400;
		margin: 1rem auto; /* top right bottom left */
		text-align: center;
		color: var(--colour-red);
		/* margin-top: 1rem;
  		margin-bottom: 3rem; */
	}
}
</style>
