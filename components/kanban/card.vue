<template>
	<div
		class="card-small rag-band"
		draggable="true"
		@drag="onDrag($event, task)"
		:id="`task-${task.uid}`"
	>
		<div class="task-header">
			<h3>{{ props.task.name }}</h3>
			<div v-if="task.assignees.length > 0">
				<AvatarStack :array="task.assignees.slice(0, 3)" />
			</div>
			<p v-else>No-one assigned to task</p>
		</div>
		<div class="info">
			<p>
				<Icon icon="material-symbols:hourglass-bottom-rounded" />
				{{ props.task.workerHours }} Hours
			</p>
			<p>
				<Icon icon="material-symbols:calendar-month-outline-rounded" />
				{{ new Date(props.task.deadline).toLocaleDateString() }}
			</p>
			<button class="content-button">
				<Icon icon="material-symbols:more-horiz" />
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.card-small {
	width: 80%;
	min-width: 30ch;
	margin-inline: auto;
}

.task-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h3 {
	margin: 0.5rem 0;
}

.info {
	color: var(--colour-text-faded);
	display: flex;
	justify-content: space-around;
	align-items: center;

	p {
		margin: 0.5rem 0;
		display: flex;
		align-items: center;
		svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
	button {
		color: var(--colour-text-faded);
		font-size: 1rem;
	}
}
</style>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const props = defineProps<{
	task: Task
}>()

function onDrag(event: DragEvent, item: Task) {
	// console.log(event)
	// console.log(item)

	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = "move"
		event.dataTransfer.effectAllowed = "move"
		event.dataTransfer.setData("task", item.uid.toString())
	} else {
		console.log("No data transfer")
	}
}
</script>
