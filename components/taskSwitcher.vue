<template>
	<section class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<ButtonSwitch @change="onChange" />
				<Button icon="material-symbols:filter-alt-outline">Filter</Button>
				<Button icon="material-symbols:add" @click="addTask">New Task</Button>
			</div>
		</header>
		<TasksList
			v-if="selectedViewMode == 1"
			:tasks="tasks"
			@details="showDialog"
		/>
		<KanbanBoard v-else :tasks="tasks" @details="showDialog" />
	</section>
	<Modal :control="modalTaskDetails" :title="currentTask.name">
		<div v-if="currentTask.subtasks && currentTask.subtasks.length > 0">
			<h2>Subtasks</h2>
			<div v-for="subtask in currentTask.subtasks" :key="subtask.uid">
				{{ subtask.name }}
			</div>
		</div>
		<ModalFooter> </ModalFooter>
	</Modal>

	<Modal :control="modalTaskDetails" :title="currentTask.name">
		<div v-if="currentTask.subtasks && currentTask.subtasks.length > 0">
			<h2>Subtasks</h2>
			<div v-for="subtask in currentTask.subtasks" :key="subtask.uid">
				{{ subtask.name }}
			</div>
		</div>
		<ModalFooter> </ModalFooter>
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
</style>

<script setup lang="ts">
import { Subtask } from ".prisma/client"

const p = defineProps<{
	tasks: KanbanTask[]
}>()

const selectedViewMode = ref(1)

function onChange(option: number) {
	selectedViewMode.value = option
}

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

async function addTask() {
	await $fetch("/api/task", {
		method: "PUT",
	})
}
</script>
