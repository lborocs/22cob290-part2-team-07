<template>
	<section class="card">
		<header class="flex-row">
			<h2>Projects Overview</h2>
			<Button
				icon="material-symbols:add"
				@click="modalCreateProject.show()"
				v-if="
					has(permissions(currentUserPermissions), Permission.Project_Create)
				"
			>
				New Project
			</Button>
		</header>
		<div class="grid-wrapper projects-wrapper">
			<ProjectManagerOverview
				v-for="uid in visibleProjects"
				:key="uid"
				:uid="uid"
			/>
		</div>
		<Modal :control="modalCreateProject" title="New Project">
			<form class="flex-col project-form">
				<label for="project-name">Name:</label>
				<input
					type="text"
					name="project-name"
					id="project-name"
					v-model="projectName"
				/>
				<label for="project-description">Description:</label>
				<textarea
					name="project-description"
					id="project-description"
					v-model="projectDescription"
					cols="30"
					rows="10"
				></textarea>
				<select
					name="project-client"
					id="project-client"
					v-model="projectClient"
				>
					<option :value="-2" disabled selected hidden>Select Client</option>
					<option
						:value="-1"
						v-if="
							has(permissions(currentUserPermissions), Permission.Client_Create)
						"
					>
						Add New Client
					</option>
					<option
						v-for="client in clients"
						:key="client.uid"
						:value="client.uid"
					>
						{{ client.name }}
					</option>
				</select>
				<label for="project-deadline">Deadline:</label>
				<input
					type="date"
					name="project-deadline"
					id="project-deadline"
					v-model="projectDeadline"
				/>
				<UserSelect
					id="project-leader"
					:users="users"
					:selection="projectLeader"
					:select-multiple="false"
				/>
			</form>
			<ModalFooter>
				<Button
					@click="createProject()"
					icon="material-symbols:check"
					:disabled="
						!projectName ||
						!projectDescription ||
						!projectClient ||
						!projectDeadline ||
						projectLeader.length === 0
					"
				>
					Apply
				</Button>
			</ModalFooter>
		</Modal>
		<Modal :control="modalCreateClient" title="New Client">
			<form class="flex-col project-form">
				<label for="client-name">Name:</label>
				<input type="text" id="client-name" v-model="clientName" />
				<label for="client-rep">Representative:</label>
				<input type="text" id="client-rep" v-model="clientRep" />
				<label for="client-email">Email:</label>
				<input type="email" id="client-email" v-model="clientEmail" />
				<label for="client-phone">Phone: (optional)</label>
				<input type="tel" id="client-phone" v-model="clientPhone" />
				<label for="client-address">Address: (optional)</label>
				<input type="tel" id="client-address" v-model="clientAddress" />
				<label for="client-website">Webite: (optional)</label>
				<input type="text" id="client-website" v-model="clientWebsite" />
			</form>
			<ModalFooter>
				<Button
					@click="createClient()"
					icon="material-symbols:check"
					:disabled="!clientName || !clientRep || !clientEmail"
				>
					Apply
				</Button>
			</ModalFooter>
		</Modal>
	</section>

	<section class="card">
		<header class="employee-top">
			<h2>Employees Overview</h2>
			<ButtonSwitch
				option1="Members"
				option2="Chart View"
				v-model:selected="employeeHoursView"
			/>
		</header>
		<div class="grid-wrapper employee-wrapper" v-if="employeeHoursView === 1">
			<ProjectMember
				v-for="member in employeesHours"
				:key="member.user.uid"
				:user="member.user"
				:assigned="member.hours"
				:tasks="member.user.assigned"
			/>
		</div>
		<ProjectChart v-else :userHours="graphHours" />
	</section>
</template>

<style scoped lang="scss">
@use "@/assets/core";

.grid-wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(35ch, 1fr));
	gap: 1rem;
}
.employee-wrapper {
	grid-template-columns: repeat(auto-fill, minmax(29ch, 1fr));
}
header {
	justify-content: space-between;
}

.employee-top {
	@extend %flex-space;
}

.project-form {
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
</style>

<script setup lang="ts">
import { Project, User } from "@prisma/client"
import { has, Permission, permissions } from "@/types/permission"
import { workerHours } from "~~/types/task"

definePageMeta({
	name: "Manager Dashboard",
	middleware: [
		async () => {
			if (
				!has(
					permissions(useCurrentUserPermissions()),
					Permission.Manager_Dashboard,
				)
			)
				navigateTo("/dashboard")
		},
	],
})

const visibleProjects = ref<number[]>([])
const { data: currentUser } = await useCurrentUser()
getVisibleProjects()

const { data: userRs } = await useFetch("/api/users")
const users = $computed(() =>
	userRs.value!.map(user => ({
		uid: user.uid,
		name: user.name,
		email: user.email,
	})),
)
const currentUserPermissions = useCurrentUserPermissions()

const { data: clients } = await useFetch("/api/clients")

const { data: employees } = await useFetch("/api/usershours")
const employeesHours = $computed(() =>
	employees
		.value!.map(user => ({
			user,
			hours: user.assigned.reduce((acc, val) => acc + workerHours(val), 0),
		}))
		.sort((a, b) => b.hours - a.hours),
)
const graphHours = $computed(() =>
	employeesHours.reduce(
		(obj, member) => ({ ...obj, [member.user.name]: member.hours }),
		{},
	),
)

const employeeHoursView = ref(1)

const modalCreateProject = useModal()
const modalCreateClient = useModal()

async function getVisibleProjects() {
	const res = await $fetch("/api/projects", {
		query: {
			u: currentUser.value!.uid,
		},
	})
	visibleProjects.value.length = 0
	for (let uid of res.map((p: Project) => p.uid)) {
		visibleProjects.value.push(uid)
	}
}

const projectName = ref<string>()
const projectDescription = ref<string>()
const projectClient = ref<number>(-2)
const projectDeadline = ref<string>()
const projectLeader = ref<User[]>([])

const clientName = ref<string>()
const clientRep = ref<string>()
const clientEmail = ref<string>()
const clientPhone = ref<string>()
const clientAddress = ref<string>()
const clientWebsite = ref<string>()

/**
 * Create a new client from inputs in form, then unhide the project creation modal
 */
async function createClient() {
	if (!clientName.value || !clientRep.value || !clientEmail.value) return

	alert(clientName.value)
	const res = await $fetch("/api/client", {
		method: "POST",
		body: JSON.stringify({
			name: clientName.value,
			representative: clientRep.value,
			email: clientEmail.value,
			phone: clientPhone.value,
			address: clientAddress.value,
			website: clientWebsite.value,
		}),
	})
	clients.value?.push(res.client)
	projectClient.value = res.client.uid
	modalCreateClient.hide()
	modalCreateProject.show()
}

async function createProject() {
	if (
		!projectName.value ||
		!projectDescription.value ||
		!projectDeadline.value ||
		projectClient.value == -2
	)
		return
	// user selected create new client
	if (projectClient.value == -1) {
		modalCreateProject.hide()
		modalCreateClient.show()
		return
	}

	const res = await $fetch("/api/project", {
		method: "POST",
		body: JSON.stringify({
			name: projectName.value,
			description: projectDescription.value,
			leader: projectLeader.value[0].email,
			client: +projectClient.value! as number,
			deadline: projectDeadline.value,
		}),
	})
	modalCreateProject.hide()
	getVisibleProjects()
}
</script>
