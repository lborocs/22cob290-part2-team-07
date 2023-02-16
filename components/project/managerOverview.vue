<template>
	<article
		class="card-small rag-band project-card"
		v-if="project"
		:style="{ '--colour-card-highlight': `var(--colour-${ragColour})` }"
	>
		<h3 class="project-title">
			<NuxtLink :to="`/project/${project.uid}`">{{ project.name }}</NuxtLink>
		</h3>
		<p class="project-description">Progress:</p>
		<ProgressBar
			:progress="`${
				project.tasks.length > 0
					? (project.tasks.filter(task => task.status === 2).length /
							project.tasks.length) *
					  100
					: 0
			}%`"
		/>
		<p class="project-description">
			{{ project.tasks.filter(task => task.status === 2).length }}/{{
				project.tasks.length
			}}
			Tasks Completed
		</p>
		<p class="project-description">
			Deadline: <Date :date="project.deadline" />
		</p>
		<p class="project-description flex-row">
			Estimated Hours Remaining:
			<span class="detail-highlight"> {{ hoursRemaining }} </span>
		</p>
		<p class="project-description flex-row">
			Worker Hours Available:
			<span class="detail-highlight">{{ workerHoursAvailable }}</span>
		</p>
	</article>
</template>

<style scoped lang="scss">
.project-title a {
	color: var(--colour-text);
	text-decoration: underline var(--colour-accent);
}

.project-card {
	width: 100%;
}
</style>

<script setup lang="ts">
import { Project, Task, User, Subtask } from "@prisma/client"
const props = defineProps<{
	uid: number
}>()
const project = ref<CompleteProject>()
project.value = await $fetch(`/api/project/${props.uid}`)

const ragColour = $computed(() => {
	if (workerHoursAvailable < hoursRemaining) {
		return "red"
	} else if (hoursRemaining > 0.75 * workerHoursAvailable) {
		return "amber"
	} else {
		return "green"
	}
})

const hoursRemaining = $computed(() => {
	const withoutSubtasks =
		// task without subtasks: add the worker hours if not completed
		project.value?.tasks
			.filter(task => task.subtasks.length === 0 && task.status !== 2)
			.reduce((acc, task) => acc + task.workerHours, 0) ?? 0
	const withSubtasks = // task with subtasks: add the worker hours of each uncompleted subtask
		project.value?.tasks
			.filter(task => task.subtasks.length > 0 && task.status !== 2)
			.reduce(
				(acc, task) =>
					acc +
					task.subtasks
						.filter(subtask => !subtask.done)
						.reduce((a, subtask) => a + subtask.workerHours, 0),
				0,
			) ?? 0
	return withoutSubtasks + withSubtasks
})

const workerHoursAvailable = $computed(() => {
	const noWorkers = project.value?.tasks

	const today = new Date()
	const deadline = new Date(project.value?.deadline!)

	// Thanks, copilot!
	const daysRemaining = Math.ceil(
		(deadline.getTime() - today.getTime()) / (1000 * 3600 * 24),
	)

	const hoursWorkedDaily = 7.5
	let allWorkers: Set<User> = new Set<User>()
	for (const task of project.value?.tasks!) {
		for (const assignee of task.assignees) {
			allWorkers.add(assignee)
		}
	}
	return allWorkers.size * hoursWorkedDaily * daysRemaining
})
</script>
