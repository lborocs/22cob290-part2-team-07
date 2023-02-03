<template>
	<section class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<ButtonSwitch @change="onChange" />
				<Button
					:icon="
						tasks == filteredTasks
							? 'material-symbols:filter-alt-outline'
							: 'material-symbols:filter-alt'
					"
					@click="modalFilter.show()"
					>Filter</Button
				>
				<Button icon="material-symbols:add" @click="modalAddTask.show()">
					New Task
				</Button>
			</div>
		</header>
		<TasksList
			v-if="selectedViewMode == 1"
			:tasks="filteredTasks"
			@details="showDialog"
		/>
		<KanbanBoard v-else :tasks="filteredTasks" @details="showDialog" />
	</section>
	<Modal :control="modalTaskDetails" :title="currentTask.name">
		<p>{{ currentTask.description }}</p>
		<Button icon="material-symbols:add" class="center-button">
			Add Subtask
		</Button>
		<div v-if="currentTask.subtasks && currentTask.subtasks.length > 0">
			<h2>Subtasks</h2>
			<ul class="subtask-list">
				<li
					v-for="subtask in currentTask.subtasks"
					:key="subtask.uid"
					class="flex-row gap-3"
				>
					<input
						type="checkbox"
						:name="subtask.uid.toString()"
						:id="subtask.uid.toString()"
						:checked="subtask.done"
						@change="onSubtaskCheckChange($event, subtask.uid)"
					/>
					<label :for="subtask.uid.toString()" class="flex-row space-between">
						<h3>{{ subtask.name }}</h3>
						<span class="dimmed flex-row gap-3">
							{{ subtask.workerHours }} Hours
							<Icon icon="material-symbols:hourglass-bottom-rounded" />
						</span>
					</label>
				</li>
			</ul>
		</div>
		<ModalFooter> </ModalFooter>
	</Modal>

	<Modal :control="modalAddTask" title="New Task">
		<form action="alert('test')" class="task-form">
			<label for="task-name">Name:</label>
			<input type="text" name="task-name" id="task-name" ref="taskName" />
			<label for="task-description">Description:</label>
			<textarea
				name="task-description"
				id="task-description"
				ref="taskDescription"
				cols="30"
				rows="10"
			></textarea>
			<label for="task-hours">Estimated Worker Hours:</label>
			<input type="number" name="task-hours" id="task-hours" ref="taskHours" />
		</form>
		<ModalFooter>
			<Button
				@click="addTask(), modalAddTask.hide()"
				icon="material-symbols:add"
				>Apply</Button
			>
		</ModalFooter>
	</Modal>

	<Modal :control="modalFilter" title="Filter Tasks">
		<div class="filter-options">
			<div class="filter-section">
				<input
					type="checkbox"
					name="ToDo"
					id="filter-todo"
					@change="filterCategories.ToDo = !filterCategories.ToDo"
					:checked="filterCategories.ToDo"
				/>
				<label for="filter-todo">To Do</label>
				<input
					type="checkbox"
					name="InProgress"
					id="filter-inprogress"
					@change="filterCategories.InProgress = !filterCategories.InProgress"
					:checked="filterCategories.InProgress"
				/>
				<label for="filter-inprogress">In Progress</label>
				<input
					type="checkbox"
					name="Done"
					id="filter-done"
					@change="filterCategories.Done = !filterCategories.Done"
					:checked="filterCategories.Done"
				/>
				<label for="filter-done">Done</label>
			</div>
		</div>
		<ModalFooter>
			<Button
				@click="applyFilter(), modalFilter.hide()"
				icon="material-symbols:filter-alt-outline"
				>Apply</Button
			>
			<Button
				@click="clearFilter(), modalFilter.hide()"
				icon="material-symbols:filter-alt-off-outline-rounded"
				>Clear</Button
			>
		</ModalFooter>
	</Modal>
</template>

<style scoped lang="scss">
@use "~/assets/core";

header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.right-buttons {
	@extend %flex-row, %flex-centre;
}

.task-form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.center-button {
	margin: auto;
}

.subtask-list {
	list-style: none;
	padding: 0;

	li {
		width: 100%;
	}

	input[type="checkbox"] {
		accent-color: var(--colour-accent);
		width: 1.2rem;
		aspect-ratio: 1;
	}
}
</style>

<script setup lang="ts">
import { Subtask } from ".prisma/client"
import { Task } from "@prisma/client"
import { Body } from "nuxt/dist/head/runtime/components"
import { TaskStatus } from "~~/types/task"
import { Icon } from "@iconify/vue"

const p = defineProps<{
	tasks: KanbanTask[]
}>()

const filteredTasks = ref(p.tasks)

const selectedViewMode = ref(1)

function onChange(option: number) {
	selectedViewMode.value = option
}

const taskName = ref<HTMLInputElement>()
const taskDescription = ref<HTMLTextAreaElement>()
const taskHours = ref<HTMLInputElement>()

const modalFilter = useModal()

const modalAddTask = useModal()

const modalTaskDetails = useModal()

// the task for display in the modal
const currentTask = ref(p.tasks[0])

async function showDialog(id: number) {
	console.log(id)

	currentTask.value = (await (
		await fetch(`/api/task/${id}`)
	).json()) as KanbanTask
	modalTaskDetails.show()
}

const filterCategories = ref({
	ToDo: true,
	InProgress: true,
	Done: true,
})

function applyFilter() {
	filteredTasks.value = p.tasks.filter(task => {
		return task.status == TaskStatus.Todo && filterCategories.value.ToDo
			? true
			: task.status == TaskStatus.InProgress &&
			  filterCategories.value.InProgress
			? true
			: task.status == TaskStatus.Done && filterCategories.value.Done
			? true
			: false
	})
}

function clearFilter() {
	filteredTasks.value = p.tasks
}

async function addTask() {
	console.log(taskName.value, taskDescription.value, taskHours.value)
	const hours = taskHours.value?.value as unknown as number

	const body = {
		task: {
			name: taskName.value?.value,
			description: taskDescription.value?.value,
			workerHours: hours,
		},
	}
	console.log(body)

	const res: { success: boolean; task: Task | undefined } = await $fetch(
		"/api/task/",
		{
			method: "PUT",
			body: body,
		},
	)
	console.log(res)

	if (res.success) {
		const response = await fetch(`/api/task/${res.task?.uid}`)
		const newTask = (await response.json()) as KanbanTask
		p.tasks.push(newTask)
	}
}

async function onSubtaskCheckChange(event: Event, uid: number) {
	const isChecked = (event.target as HTMLInputElement).checked
	console.log(isChecked)
	await $fetch(`/api/subtask/${uid}`, {
		method: "PUT",
		body: isChecked.toString(),
	})
}
</script>
