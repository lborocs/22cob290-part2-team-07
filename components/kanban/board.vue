<script setup lang="ts">
import { TaskStatus } from "@/types"
import { statusName } from "@/types/task"

const { tasks } = defineProps<{
	tasks: Task[]
}>()

const STATUSES = [TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done]

function onDragOver(event: DragEvent) {
	if (event.dataTransfer) event.dataTransfer.dropEffect = "move"
}

function onDrop(event: DragEvent, status: TaskStatus) {
	if (!event.dataTransfer) return
	const data = +event.dataTransfer.getData("task")
	const task = tasks.find(task => task.uid == data)
	if (!task) return
	task.status = status
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
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "sass:list";
@use "/assets/core" as *;

.kanban-wrapper {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.kanban-col {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;

	// right margin between each column
	&:not(:last-child)::after {
		position: absolute;
		content: "";
		right: 0;
		top: 0;
		bottom: 0;
		width: 0.2rem;
		border-radius: 100vmax;
		translate: 50% 0;
		background-color: var(--colour-text);
	}
}

.kanban-col-title {
	margin-inline: auto;
}

// rag-colours = names in css vars
@for $i from 1 through 3 {
	.kanban-col:nth-child(#{$i}) {
		@extend [data-rag="#{list.nth($rag-colours, $i)}"];
	}
}
</style>
