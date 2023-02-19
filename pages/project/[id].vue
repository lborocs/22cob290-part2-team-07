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
const { data: project } = await useFetch(`/api/project/${route.params.id}`) // Fetch project data based on id in URL.
const { data: users } = await useFetch("/api/users") // Fetch all users.

if (!project.value) {
	navigateTo("/project/error")
}
usePageName(project.value?.name)

// Set each task's project to the project it belongs to.
for (const task of project.value!.tasks) {
	task.project = project
}

const { data: currentUser } = useCurrentUser() // Get current user logged in to the system.

/** Variable used to switch between member card and chart view. */
const selectedUserViewMode = ref(1)

/** Variable used to control the Delete Project modal.*/
const modalDeleteProject = useModal()

/** Variable used to control the Edit Project Leader modal.*/
const modalTeamLeader = useModal()

/** Dynamic variable that contains the name of all users assigned to a project,
 * calculated based on their assignment to that project's tasks. Updates on addition/removal of a user.*/
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

/** Determines the number of business/working days until the specified deadline.
 * Will also take into consideration the time (hours, minutes, seconds) on the deadline day. */
const workDaysRemaining = $computed(() => {
	const deadline = new Date(project.value!.deadline)
	let currentDate = new Date()
	let daysRemaining = 0
	while (currentDate <= deadline) {
		// Skip Sunday and Saturday
		if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
			daysRemaining++
		}
		currentDate.setDate(currentDate.getDate() + 1)
	}

	return daysRemaining
})

/** Dynamic variable that contains a key-value pair of all users (name) part of a
 * 	project with their total amount of hours assigned. Updates on any change made to a
 *  task or subtask assigned to a project. */
const memberHours = $computed(() => {
	const hoursByMember: { [key: string]: number } = {}
	const tasks = project.value!.tasks.filter(task => task.status < 2)

	for (const task of tasks) {
		for (const member of projectMembers) {
			if (task.assignees.some(assignee => assignee.uid === member.uid)) {
				const taskHours = workerHours(task)
				if (task.subtasks.length > 0) {
					const subtaskHours = task.subtasks
						.filter(subtask => subtask.done)
						.reduce((total, subtask) => total + subtask.workerHours, 0)
					hoursByMember[member.name] =
						(hoursByMember[member.name] || 0) + taskHours - subtaskHours
				} else {
					hoursByMember[member.name] =
						(hoursByMember[member.name] || 0) + taskHours
				}
			}
		}
	}

	return hoursByMember
})

/** Function will delete the project and return user to dashboard. */
async function deleteProject() {
	await $fetch(`/api/project/${route.params.id}`, {
		method: "DELETE",
	})
	return navigateTo("/dashboard")
}

/** Function will update the project leader. */
async function updateLeader(projectLeader: UserRR) {
	await $fetch(`/api/project/${route.params.id}`, {
		method: "PUT",
		body: projectLeader.uid,
	})

	project.value!.leader = projectLeader
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
				icon="material-symbols:edit-outline-rounded"
				v-if="
					has(
						permissions(permissionsUser(currentUser!.roles)),
						Permission.Project_Delete,
					)
				"
				@click="modalTeamLeader.show()"
				>Change team leader</Button
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

	<TaskSwitcher :tasks="project!.tasks" :assignable-projects="[project]" />

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
	<changeTeamLeader
		:control="modalTeamLeader"
		:members="users ?? []"
		@edit="updateLeader"
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

	&-days {
		font-size: 1.25rem;
		font-weight: 400;
		margin: 1rem auto;
		text-align: center;
		color: var(--colour-red);
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
