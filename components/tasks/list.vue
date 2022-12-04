<template>
	<div class="task-list">
		<div class="task-row" v-for="task in tasks" :key="task.uid">
			<h3>{{ task.name }}</h3>
			<p class="details">{{ task.description }}</p>

			<div class="end-details">
				<AvatarStack :array="task.assignees.slice(0, 3)" />

				<p class="details">
					<Icon icon="material-symbols:hourglass-bottom-rounded" />
					{{ task.workerHours }} Hours
				</p>
				<p class="details">
					<Icon icon="material-symbols:calendar-month-outline-rounded" />
					{{ new Date(task.deadline).toLocaleDateString() }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.task-list {
	display: flex;
	flex-direction: column;
}

.task-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;

	h3 {
		padding-right: 0.5rem;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--colour-text);
	}
}

.end-details {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	margin-left: auto;
}
.details {
	color: var(--colour-text-faded);
}
</style>

<script setup lang="ts">
import { Icon } from "@iconify/vue"

defineProps<{
	tasks: Task[]
}>()
</script>
