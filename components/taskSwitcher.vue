<template>
	<section class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<ButtonSwitch
					option1="List"
					option2="Kanban"
					v-model:selected="kanbanPreference.preference"
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
		<div v-if="filteredTasks.length > 0">
			<TasksList
				v-if="kanbanPreference.preference == 1"
				:tasks="filteredTasks"
				@details="showDialog"
				@finish="onTaskFinish"
			/>
			<KanbanBoard
				v-else
				:tasks="filteredTasks"
				@details="showDialog"
				@finish="onTaskFinish"
			/>
		</div>
		<p v-else>There are no tasks matching your filter criteria</p>
	</section>

	<Modal
		v-if="currentTask != undefined"
		:control="modalTaskDetails"
		:title="currentTask.name"
	>
		<p>{{ currentTask.description }}</p>

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
		<Button
			icon="material-symbols:add"
			class="center-button"
			@click="modalTaskDetails.hide(), modalAddSubtask.show()"
		>
			Add Subtask
		</Button>
		<UserSelect
			id="edit-users"
			:users="assignableUsers"
			v-model:selection="taskEditAssignees"
		/>
		<Button
			icon="material-symbols:delete-outline"
			class="center-button"
			@click="deleteTask()"
			v-if="
				currentTask.projectId == null ||
				has(
					permissions(permissionsUser(currentUser?.roles)),
					Permission.Task_Delete,
				)
			"
		>
			Delete Task
		</Button>

		<ModalFooter>
			<Button
				icon="material-symbols:check"
				@click="applyTaskEdits($event), modalTaskDetails.hide()"
			>
				Apply Changes
			</Button>
		</ModalFooter>
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
				v-model="taskProjectId"
				@change="onNewTaskChange"
			>
				<option
					:value="-2"
					disabled
					selected
					hidden
					v-if="!p.assignableProjects"
				>
					Select project to add task to
				</option>
				<option :value="-1" v-if="!p.assignableProjects">Personal Task</option>
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
			<UserSelect
				v-if="taskProjectId != -1"
				id="new-task-users"
				:users="assignableUsers"
				v-model:selection="taskAssignees"
			/>
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

	<Modal :control="modalAddSubtask" title="New Subtask">
		<form class="task-form">
			<label for="subtask-name">Name:</label>
			<input
				type="text"
				name="subtask-name"
				id="subtask-name"
				ref="subtaskName"
				@change="onNewSubtaskChange"
			/>
			<label for="subtask-hours">Estimated Worker Hours:</label>
			<input
				type="number"
				name="subtask-hours"
				id="subtask-hours"
				ref="subtaskHours"
				@change="onNewSubtaskChange"
			/>
		</form>
		<ModalFooter>
			<Button
				@click="
					createSubtask(), modalAddSubtask.hide(), modalTaskDetails.show()
				"
				icon="material-symbols:check"
				:disabled="!newSubtaskFormCompleted"
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
						:checked="filterProjects.get(null)"
						@change="filterProjects.set(null, !filterProjects.get(null))"
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
						:checked="filterProjects.get(project?.uid)"
						@change="
							filterProjects.set(
								project?.uid,
								!filterProjects.get(project?.uid),
							)
						"
					/>
					<label :for="`filter-project-${project?.uid}`">
						{{ project?.name }}
					</label>
				</div>
			</section>
			<section class="filter">
				<h2 class="filter-header">By Assignees</h2>
				<UserSelect
					id="filter-users"
					:users="assignableUsers"
					v-model:selection="filteredAssignees"
				/>
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
	margin-block: 1.5rem;
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
import {
	has,
	permissions,
	Permission,
	permissionsUser,
} from "@/types/permission"

const emit = defineEmits<{
	(name: "renew", taskId: number, isFinished: boolean, isSubTask: boolean): void
}>()

const p = defineProps<{
	tasks: KanbanTask[]
	assignableProjects?: Project[]
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

const { data: currentUser } = await useCurrentUser()

console.log("current user roles:", currentUser.value?.roles)
console.log(
	"has delete task permission:",
	has(permissionsUser(currentUser.value?.roles), Permission.Task_Delete),
)

const kanbanPreference = useKanbanPreference()

const taskName = ref<HTMLInputElement>()
const taskDescription = ref<HTMLTextAreaElement>()
const taskHours = ref<HTMLInputElement>()
const taskProject = ref<HTMLSelectElement>()
const taskProjectId = ref<number>(-2)
const taskDeadline = ref<HTMLInputElement>()
const taskAssignees = ref<User[]>([])

const newSubtaskFormCompleted = ref<boolean>(false)
const subtaskName = ref<HTMLInputElement>()
const subtaskHours = ref<HTMLInputElement>()

// selected users for the current task
const taskEditAssignees = ref<User[]>([])

const newTaskFormCompleted = ref<boolean>(false)

const modalFilter = useModal()

const modalAddTask = useModal()

const modalTaskDetails = useModal()

const modalAddSubtask = useModal()

// the task for display in the modal
const currentTask = ref(p.tasks[0])

// the projects that new tasks can be assigned to
const assignableProjects = ref<Project[]>(p.assignableProjects ?? [])
if (p.assignableProjects === undefined) {
	getAssignableProjects()
}

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
	taskEditAssignees.value = currentTask.value.assignees
	modalTaskDetails.show()
}

const filterCategories = ref({
	ToDo: true,
	InProgress: true,
	Done: true,
})

const filterProjects = ref<Map<number | undefined | null, boolean>>(
	new Map<number | undefined | null, boolean>(),
)

// personal tasks
filterProjects.value.set(null, true)

// all projects
for (const project of visibleProjects.value) {
	filterProjects.value.set(project?.uid, true)
}

const filteredAssignees = ref<User[]>([])

function applyFilter() {
	console.log(p.tasks)

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
			return filterProjects.value.get(task.projectId)
		})
		.filter(task => {
			return (
				filteredAssignees.value.length == 0 ||
				filteredAssignees.value.some(user =>
					task.assignees?.some(assignee => assignee.uid == user.uid),
				)
			)
		})
	console.log(filteredTasks.value)
}

function clearFilter() {
	filteredTasks.value = p.tasks
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

	// if it's a personal task, assign it to the current user
	const assignees =
		taskProjectId.value == -1
			? [{ uid: currentUser.value?.uid! }]
			: taskAssignees.value.map(user => {
					return { uid: user.uid }
			  })
	console.log(assignees)
	const body = {
		task: {
			name: taskName.value?.value,
			description: taskDescription.value?.value,
			workerHours: hours,
			deadline: taskDeadline.value?.value,
			projectId: taskProject.value?.value as unknown as number,
			assignees: assignees,
		},
	}

	console.log(body)

	const res = await $fetch("/api/task/", {
		method: "PUT",
		body: body,
	})
	console.log(res)

	if (res.success && assignees!.some(a => a.uid == currentUser.value?.uid!)) {
		const response = await fetch(`/api/task/${res.task?.uid}`)
		const newTask = (await response.json()) as KanbanTask
		p.tasks.push(newTask)
		// emit("update", newTask.uid, false, false)
	}
}

async function onSubtaskCheckChange(event: Event, uid: number) {
	const isChecked = (event.target as HTMLInputElement).checked
	// console.log(isChecked)
	const res = await $fetch(`/api/subtask/${uid}`, {
		method: "PUT",
		body: isChecked.toString(),
	})
	if (res.status == 200) {
		console.log(res.newParentStatus)
		const subtask = filteredTasks.value[currentTaskIndex].subtasks.find(
			subtask => subtask.uid == uid,
		)
		subtask!.done = isChecked
		filteredTasks.value[currentTaskIndex].status = res.newParentStatus
	}
	emit("renew", uid, isChecked, true)
}

function onTaskFinish(uid: number, status: boolean) {
	emit("renew", uid, status, false)
}

async function getAssignableProjects() {
	const res = await $fetch("/api/projects")
	assignableProjects.value = res
}

async function getAssignableUsers() {
	const res = await $fetch("/api/users", {
		method: "GET",
		query: {
			minimumRank: currentUser.value?.roles.map(role => role.rank).sort()[0],
		},
	})
	assignableUsers.value = res
}

/**
 * Confirm to the user, then delete the current task
 */
async function deleteTask() {
	const response = window.confirm(
		`You are about to delete the task "${currentTask.value.name}".\nThis action cannot be undone. Are you sure you want to continue?`,
	)
	if (response) {
		const res = await $fetch(`/api/task/${currentTask.value.uid}`, {
			method: "DELETE",
		})
		if (res.status == 200) {
			filteredTasks.value.splice(currentTaskIndex, 1)
			modalTaskDetails.hide()
		}
	}
}

async function applyTaskEdits(event: Event) {
	currentTask.value.assignees = taskEditAssignees.value
	const res = await $fetch(`/api/task/${currentTask.value.uid}`, {
		method: "POST",
		body: { task: currentTask.value },
	})
	if (res.status == 200) {
		filteredTasks.value[currentTaskIndex].assignees = taskEditAssignees.value
	}
}

function onNewTaskChange(event: Event) {
	newTaskFormCompleted.value =
		taskName.value?.value.length! > 0 &&
		taskDescription.value?.value.length! > 0 &&
		taskHours.value?.value.length! > 0 &&
		(+taskProject.value?.value! as number) != -2 &&
		taskDeadline.value?.value.length! > 0
	console.log(
		taskName.value?.value,
		taskDescription.value?.value,
		taskHours.value?.value,
		taskProject.value?.value,
		taskDeadline.value?.value,
	)
}
function onNewSubtaskChange(event: Event) {
	newSubtaskFormCompleted.value =
		subtaskName.value?.value.length! > 0 &&
		subtaskHours.value?.value.length! > 0
}

async function createSubtask() {
	const res = await $fetch(`/api/subtask`, {
		method: "POST",
		body: {
			subtask: {
				name: subtaskName.value?.value,
				workerHours: +subtaskHours.value?.value!,
				parentId: currentTask.value.uid,
			},
		},
	})
	if (res.status == 200) {
		filteredTasks.value[currentTaskIndex].assignees = taskEditAssignees.value
		currentTask.value.subtasks.push(res.subtask!)
	}
	emit("renew", res.subtask!.uid, false, true)
}
</script>
