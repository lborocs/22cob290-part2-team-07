<template>
	<article
		class="card-small rag-band"
		draggable="true"
		@dragstart="onDrag"
		:id="`task-${task.uid}`"
	>
		<div class="task-header">
			<h4>{{ task.name }}</h4>
			<div v-if="task.assignees.length > 0">
				<AvatarStack :array="task.assignees" />
			</div>
			<p v-else>No-one assigned to task</p>
		</div>
		<div class="info">
			<p>
				<Icon icon="material-symbols:hourglass-bottom-rounded" />
				{{ workerHours(task) }} Hours
			</p>
			<p>
				<Icon icon="material-symbols:calendar-month-outline-rounded" />
				<Date v-if="task.deadline" :date="task.deadline" />
			</p>
			<button class="content-button">
				<Icon icon="material-symbols:more-horiz" />
			</button>
		</div>
	</article>
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
import { workerHours } from "@/types/task"
const { task } = defineProps<{
	task: KanbanTask
}>()

function onDrag(event: DragEvent) {
	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = "move"
		event.dataTransfer.setData("task", task.uid.toString())
	}
}
</script>
