<template>
	<div class="task-list">
		<div
			class="task-row"
			v-for="(task, index) in tasks"
			:key="task.uid"
			:data-status="task.status"
		>
			<input
				type="checkbox"
				name="completed"
				:id="`completed=${task.uid}`"
				class="checkbox"
				:checked="task.status == 2"
				@change="onChecked($event, task)"
			/>
			<label :for="`completed=${task.uid}`" class="sr-only">
				Mark {{ task.name }} as completed
			</label>
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
			<button @click="showModal(index)" class="content-button">
				<h3>{{ task.name }}</h3>
			</button>
			<p class="details line-limit description">{{ task.description }}</p>

			<p class="details hours">
				<Icon icon="material-symbols:hourglass-bottom-rounded" />
				{{ workerHours(task) }} Hours
			</p>
			<p class="details deadline">
				<Icon icon="material-symbols:calendar-month-outline-rounded" />
				<Date v-if="task.deadline" :date="task.deadline" />
			</p>
			<div class="avatars">
				<AvatarStack :array="task.assignees" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/core" as *;
.task-list {
	display: flex;
	--gap: 2rem;
	gap: var(--gap);
	flex-direction: column;

	max-height: 40rem;
	overflow-y: auto;
}

.task-row {
	display: grid;
	--cb-size: 1.5rem;
	grid-template-columns: var(--cb-size) 0.8fr 1fr 3fr 1fr 1fr 5rem;
	grid-template-areas: "checkbox project title description hours deadline avatar";
	flex-direction: row;
	align-items: center;
	gap: 0 1rem;
	position: relative;

	border-radius: 0.5rem;
	border-left: 0.3rem solid var(--colour-card-highlight, var(--colour-text));

	&[data-status="2"] {
		@extend %data-rag-green;
	}
	&[data-status="1"] {
		@extend %data-rag-amber;
	}
	&[data-status="0"] {
		@extend %data-rag-red;
	}

	h3 {
		padding-right: 0.5rem;
		grid-area: "title";
	}

	&:not(:last-child)::after {
		content: "";
		position: absolute;
		bottom: calc(-1 * var(--gap) / 2);
		width: 100%;
		height: 0.2rem;
		background: var(--colour-text-faded);
		border-radius: 100vmax;
		// border-bottom: 1px solid var(--colour-text);
	}

	&:has(.checkbox:checked) :where(.details, h3) {
		text-decoration: line-through;
		opacity: 0.2;
	}
}

.project {
	grid-area: project;
}
.description {
	grid-area: description;
}

.hours {
	grid-area: hours;
}

.deadline {
	grid-area: deadline;
}

.avatars {
	grid-area: avatar;
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
	grid-area: checkbox;
	width: var(--cb-size);
	height: var(--cb-size);
	accent-color: var(--colour-accent);
}

@media screen and (max-width: 900px) {
	.task-row {
		grid-template-columns: var(--cb-size) 1fr 1fr 2fr;
		grid-template-areas:
			"checkbox title hours  description"
			"checkbox project deadline  avatar";
		gap: 0 0.5rem;
	}
}
</style>

<script setup lang="ts">
import { Task } from ".prisma/client"
import { Icon } from "@iconify/vue"
import { TaskStatus, workerHours } from "@/types/task"
import { emitKeypressEvents } from "readline"

defineProps<{
	tasks: KanbanTask[]
}>()

const emit = defineEmits<{
	(name: "details", id: number): void
}>()

async function onChecked(event: Event, task: Task) {
	const isChecked = (event.target as HTMLInputElement).checked
	task.status = isChecked ? TaskStatus.Done : TaskStatus.Todo
	await $fetch(`/api/task/${task.uid}`, {
		method: "POST",
		body: { task: task },
	})
}

function showModal(id: number) {
	emit("details", id)
}
</script>
