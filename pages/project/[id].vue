<script setup lang="ts">
import { Subtask } from ".prisma/client"
import { workerHours } from "@/types/task"
import {
	has,
	Permission,
	permissions,
	permissionsUser,
} from "@/types/permission"

definePageMeta({
	name: "Project",
})

const route = useRoute()
const { data: project } = await useFetch(`/api/project/${route.params.id}`)
if (!project.value) {
	navigateTo("/project/error")
}
usePageName(project.value?.name)
for (const task of project.value!.tasks) {
	task.project = project
}

const { data: currentUser } = useCurrentUser()

const selectedUserViewMode = ref(1)

const modalDeleteProject = useModal()

// get members of project based on tasks they are assigned to
const projectMembers = $computed(() => {
	const userMap = new Map<string, UserR>()
	for (const task of project.value!.tasks) {
		for (const user of task.assignees) {
			if (!userMap.has(user.uid)) {
				userMap.set(user.uid, user)
			}
		}
	}
	return Array.from(userMap.values())
})

const workDaysRemaining = $computed(() => {
	const deadline = new Date(project.value!.deadline)
	const currentDate = new Date()
	const timeDiff = deadline.getTime() - currentDate.getTime()
	const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)) // round up to include current day
	const weekendDaysRemaining =
		Math.floor((daysRemaining + currentDate.getDay()) / 7) * 2
	const remainingWeekday = daysRemaining - weekendDaysRemaining

	return remainingWeekday
})

const memberHours = $computed(() => {
	const hoursByMember: { [key: string]: number } = {}
	const tasks = project.value!.tasks.filter(task => task.status < 2)

	for (const task of tasks) {
		for (const member of projectMembers) {
			if (task.assignees.some(assignee => assignee.uid === member.uid)) {
				hoursByMember[member.name] =
					(hoursByMember[member.name] || 0) + workerHours(task)
			}
		}
	}

	return hoursByMember
})

function updateHours(uid: number, isFinished: boolean, isSubTask: boolean) {
	let task: KanbanTask | undefined
	let subtask: Subtask | undefined
	let parentTask: KanbanTask | undefined
	if (isSubTask) {
		for (const t of project.value!.tasks) {
			subtask = t.subtasks.find(subtask => subtask.uid === uid)
			if (subtask) {
				console.log("Subtask has been finished: ", subtask)
				parentTask = t
				break
			}
		}

		if (!subtask) {
			return
		}

		const taskHours = subtask.workerHours
		console.log("Subtask worker hours: ", taskHours)
		const assignedMembers = new Set(
			parentTask!.assignees.map(member => member.name),
		)

		for (const memberName of Object.keys(memberHours)) {
			if (assignedMembers.has(memberName)) {
				if (isFinished) {
					memberHours[memberName] -= taskHours
					console.log(memberName, " hours: ", memberHours[memberName])
				} else {
					memberHours[memberName] += taskHours
					console.log(memberName, " hours: ", memberHours[memberName])
				}
			}
		}
	} else {
		task = project.value!.tasks.find(task => task.uid === uid)
		console.log("Task has been finished: ", subtask)

		if (!task) {
			return
		}

		const taskHours = workerHours(task)
		console.log("Task worker hours: ", taskHours)
		const assignedMembers = new Set(task.assignees.map(member => member.name))

		for (const memberName of Object.keys(memberHours)) {
			if (assignedMembers.has(memberName)) {
				if (isFinished) {
					memberHours[memberName] -= taskHours
					console.log(memberName, " hours: ", memberHours[memberName])
				} else {
					memberHours[memberName] += taskHours
					console.log(memberName, " hours: ", memberHours[memberName])
				}
			}
		}
	}

	// console.log(memberHours)
}

async function deleteProject() {
	await $fetch(`/api/project/${route.params.id}`, {
		method: "DELETE",
	})
	return navigateTo("/dashboard")
}
</script>

<template>
	<div class="subtitle">
		<p>{{ project!.description }}</p>
		<div class="buttons">
			<ButtonNuxt
				icon="material-symbols:gavel-rounded"
				:to="`/project/${$route.params.id}/permission`"
				v-if="
					has(
						permissions(permissionsUser(currentUser!.roles)),
						Permission.Permission_Override,
					)
				"
				>Permissions</ButtonNuxt
			>
			<Button
				icon="material-symbols:delete-outline-rounded"
				v-if="
					has(
						permissions(permissionsUser(currentUser!.roles)),
						Permission.Project_Delete,
					)
				"
				@click="modalDeleteProject.show()"
				>Delete</Button
			>
		</div>
	</div>
	<section class="flex-row">
		<ProjectCard title="Project Progress" :text="false">
			<ProjectSpinner :tasks="project!.tasks" />
		</ProjectCard>
		<ProjectCard title="Project Deadline" :text="true">
			<p id="project-deadline" class="deadline">
				<Date :date="project!.deadline" format="long" />
			</p>
			<p id="days-remaining" class="deadline-days">
				{{ workDaysRemaining }} work days remaining
			</p>
		</ProjectCard>
		<ProjectCard title="Project Lead" :text="true">
			<UserIcon
				:email="project!.leader.email"
				:name="project!.leader.name"
				:size="150"
			/>
			<p class="no-margin">{{ project!.leader.name }}</p>
		</ProjectCard>
		<ProjectCard title="Project Client" :text="true">
			<ClientIcon
				:uid="project!.client.uid"
				:name="project!.client.name"
				:size="150"
				:isClient="true"
			/>
			<p class="no-margin">{{ project!.client.name }}</p>
		</ProjectCard>
	</section>

	<TaskSwitcher
		:tasks="project!.tasks"
		@update="updateHours"
		:assignable-projects="[project]"
	/>

	<section class="card">
		<h2 class="sr-only">Project Members</h2>
		<div class="right-buttons">
			<ButtonSwitch
				option1="Members"
				option2="Chart view"
				v-model:selected="selectedUserViewMode"
			/>
		</div>
		<div class="wrap-grid" v-if="selectedUserViewMode == 1">
			<ProjectMember
				v-for="member in projectMembers"
				:key="member.uid"
				:user="member"
				:assigned="memberHours[member.name]"
			/>
		</div>
		<ProjectChart v-else :user-hours="memberHours" />
	</section>
	<DeleteConfirmation
		:control="modalDeleteProject"
		name="Project"
		@delete="deleteProject()"
	/>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.subtitle {
	@extend %flex-space, %card;
	background-color: var(--colour-background-3);
	.buttons {
		@extend %flex-row;
	}
}

.flex-row {
	@extend %flex-row;
	justify-content: center;
	flex-wrap: wrap;
}

.centre {
	@extend %flex-centre;
}

.card-small-image {
	aspect-ratio: 1;
	border-radius: 100vh;
	width: 8rem;
	height: 8rem;
	margin: 1rem 0 1rem 0;
}

.deadline {
	font-size: 3rem;
	font-weight: 500;
	margin: 0 auto; /* top right bottom left */
	text-align: center;
	/* margin-top: 3rem;
  margin-bottom: 1rem; */

	&-days {
		font-size: 1.25rem;
		font-weight: 400;
		margin: 1rem auto; /* top right bottom left */
		text-align: center;
		color: var(--colour-red);
		/* margin-top: 1rem;
  		margin-bottom: 3rem; */
	}
}

.wrap-grid {
	display: grid;
	justify-items: center;
	--card-width: 22ch;
	grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
	gap: 1rem;
}

.no-margin {
	margin: 1rem 0 0 0;
}
.right-buttons {
	@extend %flex-row, %flex-centre;
	justify-content: flex-end;
	margin: 0.5rem 0;
}
</style>
