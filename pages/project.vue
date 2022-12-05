<script setup lang="ts">
import { rankTitle } from "~/types/user"

definePageMeta({
	name: "Project",
})

const { data: tasks } = useFetch("/api/tasks", { default: () => [] as Task[] })
const currentProject = await $fetch("/api/project/1")
const deadlines = setProjectDeadlineDate(currentProject.deadline)

// Set project deadline date
function setProjectDeadlineDate(deadline: any) {
	const projectDeadlineDate = new Date(deadline)
	const projectDeadlineDateFormatted = projectDeadlineDate.toLocaleDateString(
		"en-gb",
		{
			day: "numeric",
			month: "long",
			year: "numeric",
		},
	)
	const daysRemaing =
		dateDiffInDays(new Date(), projectDeadlineDate) + " days remaining"

	return { projectDeadlineDateFormatted, daysRemaing }
}

// Display days left until project deadline
function dateDiffInDays(a: any, b: any) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

	return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}
</script>

<template>
	<section class="flex-row">
		<ProjectCard title="Project Progress" :text="false">
			<ProjectSpinner />
		</ProjectCard>
		<ProjectCard title="Project Deadline" :text="true">
			<p id="project-deadline" class="deadline">
				{{ deadlines.projectDeadlineDateFormatted }}
			</p>
			<p id="days-remaining" class="deadline-days">
				{{ deadlines.daysRemaing }}
			</p>
		</ProjectCard>
		<ProjectCard title="Project Lead" :text="true">
			<UserIcon
				:uid="currentProject.leader.uid"
				:name="currentProject.leader.name"
				:size="150"
			/>
			<p>{{ currentProject.leader.name }}</p>
		</ProjectCard>
		<ProjectCard title="Project Client" :text="true">
			<UserIcon :uid="1" name="Loughborough University" :size="150" />
			<p>Loughborough University</p>
		</ProjectCard>
	</section>

	<section class="card">
		<TaskSwitcher :tasks="tasks!" />
	</section>

	<section class="card wrap-grid">
		<ProjectMember
			v-for="member in currentProject.team"
			:key="member.uid"
			:uid="member.uid"
			:uname="member.name"
			:rank="rankTitle(member.rank)"
		/>
	</section>
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

.wrap-grid {
	display: grid;
	justify-items: center;
	--card-width: 20ch;
	grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
	gap: 0.5rem;
}

.wrap-grid .card-small {
	text-align: center;
	max-width: var(--card-width, 20ch);
}
</style>
