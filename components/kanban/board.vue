<template>
	<div class="kanban-wrapper">
		<div
			class="kanban-col"
			@dragover="onDragOver($event)"
			@drop="onDrop($event)"
		>
			<KanbanCard
				v-for="task in tasks.filter(task => task.status == TaskStatus.Todo)"
				:key="task.uid"
				:task="task"
			/>
		</div>
		<div class="kanban-col">
			<KanbanCard
				v-for="task in tasks.filter(
					task => task.status == TaskStatus.InProgress,
				)"
				:key="task.uid"
				:task="task"
			/>
		</div>
		<div class="kanban-col">
			<KanbanCard
				v-for="task in tasks.filter(task => task.status == TaskStatus.Done)"
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

// rag-colours = names in css vars
@for $i from 1 through 3 {
	.kanban-col:nth-child(#{$i}) {
		@extend [data-rag="#{list.nth($rag-colours, $i)}"];
	}
}
</style>

<script setup lang="ts">
import { TaskStatus } from "~~/types"

defineProps<{
	tasks: Task[]
}>()

function onDragOver(event: DragEvent) {
	event.preventDefault()
	// console.log("dragging over")
}

function onDrop(event: DragEvent) {
	event.preventDefault()
	if (event.dataTransfer) {
		const data = event.dataTransfer.getData("task")
		const target = event.target as HTMLElement
		const id = `task-${data}`
		console.log(id)

		// target.appendChild(document.getElementById(id)!)
		console.table(event.dataTransfer)

		console.log(data)
	} else {
		console.log("no data")
	}
}
</script>
