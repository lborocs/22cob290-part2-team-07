<script setup lang="ts">
import { Task } from "@prisma/client"
import { workerHours } from "~~/types/task"

const p = defineProps<{
	tasks: KanbanTask[]
}>()

/** Dynamic variable that calculates the total number of worker hours of tasks assigned to the project. */
const totalHours = computed(() => {
	let sum = 0
	for (const task of p.tasks) {
		sum += workerHours(task)
	}
	return sum
})

/** Dynamic variable that calculates the total number of worker hours of completed tasks assigned to the project */
const hoursProgress = computed(() => {
	let sum = 0
	for (const task of p.tasks) {
		if (task.status === 2) {
			sum += workerHours(task)
		}
	}
	return sum
})

/** Dynamic variable that calculates the percentage of completed worker hours assigned to the project */
const percentage = $computed(() => {
	let result = (hoursProgress.value / totalHours.value) * 100
	return Math.round(result)
})
</script>

<template>
	<div
		class="spinner-parent"
		id="progress-bar"
		:style="`--progress: ${percentage}%; --progress-angle: ${
			percentage / 100
		}turn`"
	>
		<div class="spinner"></div>
		<div class="spinner-end-wrapper"></div>
		<div class="center">
			<span id="percentageDone">{{ percentage }}%</span>
			<p id="tasksDone">
				{{ hoursProgress }}/{{ totalHours }} work hours completed
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "~/assets/colour";
@use "~/assets/animation";

.spinner-parent {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 14rem;
	aspect-ratio: 1;
	background: transparent;
	border-radius: 100vh;
	isolation: isolate;
	--width: calc(25% / 2);

	&::before {
		position: absolute;
		top: 0;
		content: "";
		width: var(--width);
		aspect-ratio: 1;
		background: var(--colour-accent);
		border-radius: 100vmax;
		z-index: 1;
	}
}

.spinner {
	--prog: var(--progress, 60%);

	position: absolute;
	border-radius: 100vmax;
	inset: 0;
	transition: --prog animation.$transition-medium ease-in;
	animation: initialise-prog 1s ease-in-out forwards;
	background: conic-gradient(
		from 0deg at 50% 50%,
		var(--colour-accent) var(--prog),
		colour.$mid-grey var(--prog)
	);
}

@property --prog {
	syntax: "<percentage>";
	inherits: false;
	initial-value: 30%;
}

@keyframes initialise-prog {
	0% {
		--prog: 0%;
	}
	100% {
		--prog: var(--progress, 60%);
	}
}

@keyframes initialise-end-rot {
	0% {
		rotate: 0turn;
	}
	100% {
		rotate: var(--progress-angle, 0.6turn);
	}
}
.spinner-parent .center {
	width: 75%;
	z-index: 1;
	background-color: var(--colour-highlight);
	aspect-ratio: 1;
	border-radius: 100vmax;
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.spinner-end-wrapper {
	position: absolute;
	width: 100%;
	aspect-ratio: 1;
	background: transparent;
	animation: initialise-end-rot 1s ease-in-out forwards;

	&::after {
		content: "";
		position: absolute;
		width: var(--width);
		left: calc(50% - var(--width) / 2);

		aspect-ratio: 1;
		background: var(--colour-accent);
		border-radius: 100vmax;
		z-index: 3;
	}
}
.center #percentageDone {
	font-size: 2em;
	margin: 0;
	font-weight: 700;
}
.center p {
	margin: 0;
}
</style>
