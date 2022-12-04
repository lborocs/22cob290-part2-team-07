<template>
	<div class="task-list">
		<div class="task-row" v-for="task in tasks" :key="task.uid">
			<input type="checkbox" name="completed" class="checkbox" />
			<div class="project details">
				<span v-if="task.project" class="project-title">
					<Icon icon="material-symbols:push-pin-outline" />
					<p>{{ task.project.name }}</p>
				</span>
				<span v-else class="project-title">
					<Icon icon="material-symbols:person-outline" />
					<p>Personal</p>
				</span>
			</div>
			<h3>{{ task.name }}</h3>
			<p class="details line-limit">{{ task.description }}</p>

			<p class="details">
				<Icon icon="material-symbols:hourglass-bottom-rounded" />
				{{ task.workerHours }} Hours
			</p>
			<p class="details">
				<Icon icon="material-symbols:calendar-month-outline-rounded" />
				{{ new Date(task.deadline).toLocaleDateString() }}
			</p>
			<AvatarStack :array="task.assignees.slice(0, 3)" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.task-list {
	display: flex;
	flex-direction: column;
}

.task-row {
	display: grid;
	--cb-size: 1.5rem;
	grid-template-columns: var(--cb-size) 0.8fr 1fr 3fr 1fr 1fr 0.5fr;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	position: relative;

	h3 {
		padding-right: 0.5rem;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--colour-text);
	}

	&:has(.checkbox:checked) {
		opacity: 0.5;
		text-decoration: line-through;
	}
}

.project-title {
	font-size: 2rem;
	display: flex;
	align-items: center;
	p {
		font-size: 1rem;
	}
}

.details {
	color: var(--colour-text-faded);
	display: flex;
	align-items: center;
	gap: 0.4rem;
	svg {
		font-size: 1.4rem;
	}
}

.line-limit {
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2; /* number of lines to show */
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.checkbox {
	width: var(--cb-size);
	height: var(--cb-size);
	accent-color: var(--colour-accent);
}
</style>

<script setup lang="ts">
import { Icon } from "@iconify/vue"

defineProps<{
	tasks: Task[]
}>()
</script>
