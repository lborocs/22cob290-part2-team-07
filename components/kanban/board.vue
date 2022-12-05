<template>
	<div
		class="draggable"
		draggable="true"
		style="background: red"
		@drag="onDrag"
	>
		This is draggable
	</div>
	<div class="kanban-wrapper">
		<div class="kanban-col" @dragover="onDragOver" @drop="onDrop">
			<h3 class="kanban-col-title">TODO</h3>
			<KanbanCard
				v-for="task in tasks.filter(task => task.status == TaskStatus.Todo)"
				:key="task.uid"
				:task="task"
			/>
		</div>
		<div class="kanban-col">
			<h3 class="kanban-col-title">In Progress</h3>
			<KanbanCard
				v-for="task in tasks.filter(
					task => task.status == TaskStatus.InProgress,
				)"
				:key="task.uid"
				:task="task"
			/>
		</div>
		<div class="kanban-col">
			<h3 class="kanban-col-title">Done</h3>
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

<script setup lang="ts">
import { TaskStatus } from "~~/types"

defineProps<{
	tasks: Task[]
}>()

function onDrag(event: DragEvent) {
	// console.log(event)
	// console.log(item)
	event.preventDefault()
	/* if (event.dataTransfer) {
		// event.dataTransfer.dropEffect = "move"
		// event.dataTransfer.effectAllowed = "move"
		
	} else {
		console.log("No data transfer")
	} */
	event.dataTransfer!.setData("task", `This is draggable`)
	console.log(event.dataTransfer!)
	console.log(event.dataTransfer!.getData("task"))
}

function onDragOver(event: DragEvent) {
	if (event.preventDefault) {
		event.preventDefault()
	}
	return false

	// console.log("dragging over")
}

function onDrop(event: DragEvent) {
	console.log(event.dataTransfer!.types)

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
