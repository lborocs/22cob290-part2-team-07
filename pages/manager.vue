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
				<select name="project-client" id="project-client" ref="project-client">
					<option :value="-1" disabled selected hidden>Select Client</option>
					<option :value="-1">Add New Client</option>
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
				<Button
					@click="createProject(), modalCreateProject.hide()"
					icon="material-symbols:check"
				>
					Apply
				</Button>
			</ModalFooter>
		</Modal>
	</section>

	<section class="card">
		<h2>Employees Overview</h2>
	</section>
</template>

<style scoped lang="scss">
.grid-wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50ch, 1fr));
	grid-gap: 1rem;
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

const modalCreateProject = useModal()

async function getVisibleProjects() {
	const res = await $fetch("/api/projects")
	console.log(res)
	for (let uid of res.map((p: Project) => p.uid)) {
		visibleProjects.value.push(uid)
	}
}

const projectName = ref<HTMLInputElement>()
const projectDescription = ref<HTMLTextAreaElement>()
const projectClient = ref<HTMLSelectElement>()
const projectDeadline = ref<HTMLInputElement>()

async function createProject() {
	console.log(projectDeadline.value?.value)

	/* console.log(
		projectName.value?.value,
		projectClient.value?.value,
		projectDeadline.value?.value,
	) */

	const res = await $fetch("/api/project", {
		method: "POST",
		body: JSON.stringify({
			name: projectName.value?.value,
			description: projectDescription.value?.value,
			leader: "queen",
			client: 8,
			deadline: projectDeadline.value?.value,
		}),
	})
	console.log(res)
}
</script>
