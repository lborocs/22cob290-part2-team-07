<template>
	<article class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<Button icon="material-symbols:filter-alt-outline">Filter</Button>
				<Button icon="material-symbols:add">New Task</Button>
			</div>
		</header>
		<KanbanBoard :tasks="tasks" />
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
</script>
