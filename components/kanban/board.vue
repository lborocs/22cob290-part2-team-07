<script setup lang="ts">
import { Task } from ".prisma/client"
import { TaskStatus, statusName } from "@/types/task"

const { tasks } = defineProps<{
	tasks: KanbanTask[]
}>()

const emit = defineEmits<{
	(name: "details", id: number): void
}>()

const STATUSES = [TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done]

function onDragOver(event: DragEvent) {
	if (event.dataTransfer) event.dataTransfer.dropEffect = "move"
}

async function onDrop(event: DragEvent, status: TaskStatus) {
	if (!event.dataTransfer) return
	const data = +event.dataTransfer.getData("task").split(" ")[0]
	const ogStatus = +event.dataTransfer.getData("task").split(" ")[1]
	const task = tasks.find(task => task.uid == data)

	if (!task) return
	task.status = status
	await $fetch(`/api/task/${task.uid}`, {
		method: "POST",
		body: {
			task: {
				uid: task.uid,
				assignees: task.assignees,
				status: task.status,
			},
		},
	})
}

function emitDialog(id: number) {
	emit("details", id)
}
</script>

<template>
	<div class="kanban-wrapper">
		<div
			v-for="status in STATUSES"
			:key="status"
			class="kanban-col"
			@dragover.prevent="onDragOver"
			@drop.prevent="onDrop($event, status)"
		>
			<h3 class="kanban-col-title">{{ statusName(status) }}</h3>
			<KanbanCard
				v-for="task in tasks.filter(task => task.status == status)"
				:key="task.uid"
				:task="task"
				@details="emitDialog(tasks.indexOf(task))"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "sass:list";
@use "~/assets/core";

.kanban-wrapper {
	display: grid;
	grid-template-columns: 1fr;
}

.kanban-col {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;
	max-height: 45rem;
	overflow-x: hidden;
	overflow-y: auto;

	// right margin between each column
	&:not(:last-child)::after {
		position: absolute;
		content: "";
		border-radius: 100vmax;
		background-color: var(--colour-text);
		bottom: 0;
		width: 100%;
		translate: 0 1rem;
		height: 0.2rem;
	}
}

.kanban-col-title {
	margin-inline: auto;
}

// rag-colours = names in css vars
@for $i from 1 through 3 {
	.kanban-col:nth-child(#{$i}) {
		@extend %data-rag-#{list.nth(core.$rag-colours, $i)};
	}
}

@media screen and (min-width: 900px) {
	.kanban-wrapper {
		grid-template-columns: repeat(3, 1fr);
	}

	.kanban-col:not(:last-child)::after {
		translate: 50% 0;
		right: 0;
		top: 0;
		height: 100%;
		width: 0.2rem;
	}
}
</style>
