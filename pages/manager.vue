<template>
	<section class="card">
		<header class="flex-row">
			<h2>Projects Overview</h2>
			<Button icon="material-symbols:add" @click="modalCreateProject.show()">
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
					ref="projectName"
				/>
				<label for="project-description">Description:</label>
				<textarea
					name="project-description"
					id="project-description"
					ref="projectDescription"
					cols="30"
					rows="10"
				></textarea>
				<select name="project-client" id="project-client" ref="projectClient">
					<option :value="-2" disabled selected hidden>Select Client</option>
					<option :value="-1">Add New Client</option>
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
					ref="projectDeadline"
				/>
			</form>
			<ModalFooter>
				<Button @click="createProject()" icon="material-symbols:check">
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
		<h2>Employees Overview</h2>
		<div class="grid-wrapper employee-wrapper">
			<ProjectMember
				v-for="member in employees"
				:key="member.uid"
				:user="{ ...member, ...{ roles: [] } }"
				:assigned="8"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
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
import { Project, Task, User, Subtask, Client } from "@prisma/client"

definePageMeta({
	name: "Manager Dashboard",
})

const visibleProjects = ref<number[]>([])
getVisibleProjects()

const { data: clients } = await useFetch("/api/clients")

const { data: employees } = await useFetch("/api/users")

const modalCreateProject = useModal()
const modalCreateClient = useModal()

async function getVisibleProjects() {
	const res = await $fetch("/api/projects")
	for (let uid of res.map((p: Project) => p.uid)) {
		visibleProjects.value.push(uid)
	}
}

const projectName = ref<HTMLInputElement>()
const projectDescription = ref<HTMLTextAreaElement>()
const projectClient = ref<HTMLSelectElement>()
const projectDeadline = ref<HTMLInputElement>()

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
	console.log(clientName.value)
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
	modalCreateClient.hide()
	modalCreateProject.show()
}

async function createProject() {
	if (
		!projectName.value?.value ||
		!projectDescription.value?.value ||
		!projectDeadline.value?.value ||
		projectClient.value?.value == "-2"
	)
		return
	// user selected create new client
	if (projectClient.value?.value == "-1") {
		modalCreateProject.hide()
		modalCreateClient.show()
		return
	}

	const res = await $fetch("/api/project", {
		method: "POST",
		body: JSON.stringify({
			name: projectName.value?.value,
			description: projectDescription.value?.value,
			leader: "queen",
			client: +projectClient.value?.value! as number,
			deadline: projectDeadline.value?.value,
		}),
	})
	console.log(res)
	modalCreateProject.hide()
}
</script>
