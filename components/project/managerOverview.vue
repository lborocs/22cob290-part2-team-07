<template>
	<article class="card-small rag-band">
		<h3 class="project-title">
			<NuxtLink :to="`/project/${project.uid}`">{{ project.name }}</NuxtLink>
		</h3>
		<p class="project-description">Progress:</p>
		<ProgressBar
			:progress="`${
				(project.tasks.filter(task => task.status === 2).length /
					project.tasks.length) *
				100
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
		<p class="project-description">
			Estimated Hours Remaining:
			<span class="detail-highlight">
				{{
					// task without subtasks: add the worker hours if not completed
					project.tasks
						.filter(task => task.subtasks.length === 0 && task.status !== 2)
						.reduce((acc, task) => acc + task.workerHours, 0) +
					// task with subtasks: add the worker hours of each uncompleted subtask
					project.tasks
						.filter(task => task.subtasks.length > 0 && task.status !== 2)
						.reduce(
							(acc, task) =>
								acc +
								task.subtasks
									.filter(subtask => !subtask.done)
									.reduce((a, subtask) => a + subtask.workerHours, 0),
							0,
						)
				}}
			</span>
		</p>
		<p class="project-description">Worker Hours Available:</p>
	</article>
</template>

<style scoped lang="scss">
.project-title a {
	color: var(--colour-text);
	text-decoration: underline var(--colour-accent);
}
</style>

<script setup lang="ts">
import { Project, Task } from "@prisma/client"
const props = defineProps<{
	project: Project & { tasks: KanbanTask[] }
}>()
</script>
