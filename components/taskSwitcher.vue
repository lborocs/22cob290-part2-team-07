<template>
	<article class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<ButtonSwitch @change="onChange" />
				<Button icon="material-symbols:filter-alt-outline">Filter</Button>
				<Button icon="material-symbols:add">New Task</Button>
			</div>
		</header>
		<TasksList v-if="selectedViewMode == 1" :tasks="tasks" />
		<KanbanBoard v-else :tasks="tasks" />
	</article>
</template>

<style lang="scss">
@use "/assets/core";

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
defineProps<{
	tasks: Task[]
}>()

const selectedViewMode = ref(1)

function onChange(option: number) {
	selectedViewMode.value = option
}
</script>
