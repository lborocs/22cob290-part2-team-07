<template>
	<div class="card-small rag-band">
		<h3>{{ props.task.title }}</h3>
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
.info {
	color: var(--colour-text-faded);
	display: flex;
	justify-content: space-around;
	p {
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
