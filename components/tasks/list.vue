<template>
	<div class="task-list">
		<div class="task-row" v-for="task in tasks" :key="task.uid">
			<h3>{{ task.name }}</h3>

			<AvatarStack :array="task.assignees.slice(0, 3)" />
		</div>
	</div>
</template>

<style lang="scss">
.task-list {
	display: flex;
	flex-direction: column;
}

.task-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--colour-text);
	}
}
</style>

<script setup lang="ts">
defineProps<{
	tasks: Task[]
}>()
</script>
