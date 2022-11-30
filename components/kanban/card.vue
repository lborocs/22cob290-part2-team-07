<template>
	<div class="card-small rag-band">
		<div class="task-header">
			<h3>{{ props.task.title }}</h3>
			<div class="assignees" v-if="task.assignees">
				<img
					v-for="person in task.assignees.slice(0, 3)"
					:src="`https://ui-avatars.com/api/?name=${person.replace(
						' ',
						'+',
					)}&background=random&color=fff&size=42&rounded=true`"
					:alt="`Avatar for ${person}`"
				/>
				<div v-if="task.assignees.length > 3" class="more-assignees">
					+{{ task.assignees.length - 3 }}
				</div>
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
				{{ props.task.dueDate }}
			</p>
			<p>
				<Icon icon="material-symbols:analytics-outline-rounded" />
				View More
			</p>
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

	.assignees {
		display: flex;
		flex-direction: row-reverse;
		img:not(:last-child) {
			margin-left: -1.5rem;
		}
		.more-assignees {
			display: block;
			--image-size: 42px;
			width: var(--image-size);
			height: var(--image-size);
			background-color: red;
			border-radius: 100vmax;
			display: grid;
			place-items: center;
		}
	}
}

h3 {
	margin: 0.5rem 0;
}

.info {
	color: var(--colour-text-faded);
	display: flex;
	justify-content: space-around;

	p {
		margin: 0.5rem 0;
		display: flex;
		align-items: center;
		svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
}
</style>

<script setup>
import { Icon } from "@iconify/vue"
const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
})
</script>
