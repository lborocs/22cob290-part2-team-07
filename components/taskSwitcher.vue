<template>
	<section class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<ButtonSwitch
					option1="List"
					option2="Kanban"
					v-model:selected="selectedViewMode"
				/>
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
		<form class="task-form">
			<label for="task-name">Name:</label>
			<input
				type="text"
				name="task-name"
				id="task-name"
				ref="taskName"
				@change="onNewTaskChange"
			/>
			<label for="task-description">Description:</label>
			<textarea
				name="task-description"
				id="task-description"
				ref="taskDescription"
				cols="30"
				rows="10"
				@change="onNewTaskChange"
			></textarea>
			<label for="task-hours">Estimated Worker Hours:</label>
			<input
				type="number"
				name="task-hours"
				id="task-hours"
				ref="taskHours"
				@change="onNewTaskChange"
			/>
			<select
				name="project"
				id="task-project"
				ref="taskProject"
				@change="onNewTaskChange"
			>
				<option :value="-1" disabled selected hidden>
					Select project to add task to
				</option>
				<option :value="null">Personal Task</option>
				<option
					v-for="project in assignableProjects"
					:key="project.uid"
					:value="project.uid"
				>
					{{ project.name }}
				</option>
			</select>
			<label for="task-deadline">Deadline:</label>
			<input
				type="date"
				name="task-deadline"
				id="task-deadline"
				ref="taskDeadline"
				@change="onNewTaskChange"
			/>
			<UserSelect :users="assignableUsers" @change="taskAssignees = $event" />
		</form>
		<ModalFooter>
			<Button
				@click="addTask(), modalAddTask.hide()"
				icon="material-symbols:check"
				:disabled="!newTaskFormCompleted"
			>
				Apply
			</Button>
		</ModalFooter>
	</Modal>

	<Modal :control="modalFilter" title="Filter Tasks">
		<div class="filters-wrapper">
			<section class="filters">
				<h2 class="filter-header">By Status</h2>
				<div class="cb-wrapper">
					<input
						type="checkbox"
						name="ToDo"
						id="filter-todo"
						@change="filterCategories.ToDo = !filterCategories.ToDo"
						:checked="filterCategories.ToDo"
					/>
					<label for="filter-todo">To Do</label>
				</div>
				<div class="cb-wrapper">
					<input
						type="checkbox"
						name="InProgress"
						id="filter-inprogress"
						@change="filterCategories.InProgress = !filterCategories.InProgress"
						:checked="filterCategories.InProgress"
					/>
					<label for="filter-inprogress">In Progress</label>
				</div>
				<div class="cb-wrapper">
					<input
						type="checkbox"
						name="Done"
						id="filter-done"
						@change="filterCategories.Done = !filterCategories.Done"
						:checked="filterCategories.Done"
					/>
					<label for="filter-done">Done</label>
				</div>
			</section>
			<section class="filter">
				<h2 class="filter-header">By Project</h2>
				<div class="cb-wrapper">
					<input
						type="checkbox"
						name="personal"
						id="filter-personal"
						:checked="filterProjectIds.includes(null)"
						@change="toggleProjectFilter(null)"
					/>
					<label for="filter-personal">Personal Tasks</label>
				</div>
				<div
					class="cb-wrapper"
					v-for="project in visibleProjects"
					:key="project?.uid"
				>
					<input
						type="checkbox"
						name="personal"
						:id="`filter-project-${project?.uid}`"
						:checked="filterProjectIds.includes(project?.uid)"
						@change="toggleProjectFilter(project?.uid)"
					/>
					<label :for="`filter-project-${project?.uid}`">
						{{ project?.name }}
					</label>
				</div>
			</section>
			<section class="filter">
				<h2 class="filter-header">By Assignees</h2>
				<UserSelect :users="assignableUsers" />
			</section>
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
	align-items: flex-end;
}

.right-buttons {
	@extend %flex-row, %flex-centre;
}

.task-form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	input,
	select,
	textarea {
		border: none;
		border-bottom: 0.1rem solid var(--colour-accent);
		font-size: 1rem;
		accent-color: var(--colour-accent);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
	textarea {
		resize: vertical;
	}
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

.filters-wrapper {
	.filters {
		display: flex;
		flex-direction: column;
	}
}
.filter {
	margin-top: 1rem;
}
.filter-header {
	margin: 0 0 0.2rem 0;
}
.cb-wrapper {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>

<script setup lang="ts">
import { Subtask, User } from ".prisma/client"
import { Project, Task } from "@prisma/client"
import { Body } from "nuxt/dist/head/runtime/components"
import { TaskStatus } from "~~/types/task"
import { Icon } from "@iconify/vue"
import { arrayBuffer } from "stream/consumers"

const p = defineProps<{
	tasks: KanbanTask[]
}>()

const filteredTasks = ref(p.tasks)

// The projects associated with our tasks, given by mapping to get an array of
// projects, then filtering to remove duplicates and null values
const visibleProjects = ref<(Project | null | undefined)[]>(
	p.tasks
		.map(task => task.project)
		.filter((project, index, array) => {
			return (
				project !== null &&
				array.findIndex(p => p?.uid === project?.uid) === index
			)
		}),
)

const selectedViewMode = ref(1)

const taskName = ref<HTMLInputElement>()
const taskDescription = ref<HTMLTextAreaElement>()
const taskHours = ref<HTMLInputElement>()
const taskProject = ref<HTMLSelectElement>()
const taskDeadline = ref<HTMLInputElement>()
const taskAssignees = ref<number[]>([])

const newTaskFormCompleted = ref<boolean>(false)

const modalFilter = useModal()

const modalAddTask = useModal()

const modalTaskDetails = useModal()

// the task for display in the modal
const currentTask = ref(p.tasks[0])

// the projects that new tasks can be assigned to
const assignableProjects = ref<Project[]>([])
getAssignableProjects()

const assignableUsers = ref<User[]>([])
getAssignableUsers()

let currentTaskIndex = 0

async function showDialog(index: number) {
	console.log(index)
	currentTaskIndex = index
	const task = filteredTasks.value[index]

	currentTask.value = (await (
		await fetch(`/api/task/${task.uid}`)
	).json()) as KanbanTask
	modalTaskDetails.show()
}

const filterCategories = ref({
	ToDo: true,
	InProgress: true,
	Done: true,
})

const filterProjectIds = ref<(number | undefined | null)[]>(
	visibleProjects.value.map(p => p?.uid),
)
filterProjectIds.value.push(null)

const filterUserIds = ref<string[]>([])

function applyFilter() {
	filteredTasks.value = p.tasks
		.filter(task => {
			return task.status == TaskStatus.Todo && filterCategories.value.ToDo
				? true
				: task.status == TaskStatus.InProgress &&
				  filterCategories.value.InProgress
				? true
				: task.status == TaskStatus.Done && filterCategories.value.Done
				? true
				: false
		})
		.filter(task => {
			return filterProjectIds.value.includes(task.project?.uid)
		})
	console.log(filteredTasks.value)
}

function clearFilter() {
	filteredTasks.value = p.tasks
}

function toggleProjectFilter(projectId: number | undefined | null) {
	if (filterProjectIds.value.includes(projectId)) {
		filterProjectIds.value = filterProjectIds.value.splice(
			filterProjectIds.value.indexOf(projectId),
			1,
		)
	} else {
		filterProjectIds.value.push(projectId)
	}
	console.log(filterProjectIds.value)
}

async function addTask() {
	console.log(
		taskName.value?.value,
		taskDescription.value?.value,
		taskHours.value?.value,
		taskProject.value?.value,
		taskDeadline.value?.value,
	)
	const hours = taskHours.value?.value as unknown as number

	const body = {
		task: {
			name: taskName.value?.value,
			description: taskDescription.value?.value,
			workerHours: hours,
			deadline: taskDeadline.value?.value,
			projectId: taskProject.value?.value as unknown as number,
			assignees: taskAssignees.value.map(id => {
				return { uid: id }
			}),
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
	const res = await $fetch(`/api/subtask/${uid}`, {
		method: "PUT",
		body: isChecked.toString(),
	})
	if (res.status == 200) {
		console.log(res.newParentStatus)
		filteredTasks.value[currentTaskIndex].status = res.newParentStatus
	}
}

async function getAssignableProjects() {
	const res = await $fetch("/api/projects")
	assignableProjects.value = res
}

async function getAssignableUsers() {
	const res = await $fetch("/api/users")
	assignableUsers.value = res
}

function onNewTaskChange(event: Event) {
	newTaskFormCompleted.value =
		taskName.value?.value.length! > 0 &&
		taskDescription.value?.value.length! > 0 &&
		taskHours.value?.value.length! > 0 &&
		(+taskProject.value?.value! as number) != -1 &&
		taskDeadline.value?.value.length! > 0
	console.log(
		taskName.value?.value,
		taskDescription.value?.value,
		taskHours.value?.value,
		taskProject.value?.value,
		taskDeadline.value?.value,
	)
}
</script>
