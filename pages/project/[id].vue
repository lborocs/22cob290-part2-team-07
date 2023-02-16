<script setup lang="ts">
import { User, Subtask, Task } from ".prisma/client"
import { workerHours } from "@/types/task"

definePageMeta({
	name: "Project",
})

const route = useRoute()
const { data: project } = await useFetch(`/api/project/${route.params.id}`)
usePageName(project.value?.name)

const daysRemaing = $computed(() => {
	const date = new Date(project.value!.deadline)
	return dateDiffInDays(new Date(), date)
})

// get members of project based on tasks they are assigned to
const projectMembers = $computed(() => {
	const members: UserR[] = []
	for (const task of project.value!.tasks) {
		for (const user of task.assignees)
			if (!members.includes(user)) members.push(user)
	}
	return members
})

const memberHours = reactive(initHours())

function initHours(): { [key: string]: number } {
	const hoursByMember: { [key: string]: number } = {}

	const tasks = project.value!.tasks.filter(
		task => task.status === 0 || task.status === 1,
	)
	for (const task of tasks) {
		for (const member of projectMembers) {
			if (task.assignees.includes(member)) {
				hoursByMember[member.name] =
					(hoursByMember[member.name] || 0) + workerHours(task)
			}
		}
	}
	return hoursByMember
}

function updateHours(uid: number, status: boolean, isSubTask: boolean) {
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
				if (status) {
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
				if (status) {
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

// Display days left until project deadline
function dateDiffInDays(a: any, b: any) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

	return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

const selectedUserViewMode = ref(1)
</script>

<template>
	<p>{{ project!.description }}</p>
	<section class="flex-row">
		<ProjectCard title="Project Progress" :text="false">
			<ProjectSpinner />
		</ProjectCard>
		<ProjectCard title="Project Deadline" :text="true">
			<p id="project-deadline" class="deadline">
				<Date :date="project!.deadline" format="long" />
			</p>
			<p id="days-remaining" class="deadline-days">
				{{ daysRemaing }} Days remaining
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
</template>

<style scoped lang="scss">
@use "~/assets/core";

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

	.card-small {
		text-align: center;
		width: clamp(10ch, 100%, 30ch);
		// max-width: var(--card-width);
	}
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
