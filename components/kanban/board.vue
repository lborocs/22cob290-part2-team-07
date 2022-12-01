<template>
	<article class="card">
		<header>
			<h2>Tasks</h2>
			<div class="right-buttons">
				<button>Filter</button>
				<button>Add Item</button>
			</div>
		</header>
		<section class="kanban-wrapper">
			<div class="kanban-col">
				<KanbanCard
					v-for="task in tasks.filter(task => task.status == TaskStatus.Todo)"
					:key="task.uid"
					:task="task"
				/>
			</div>
			<div class="kanban-col">
				<KanbanCard
					v-for="task in tasks.filter(
						task => task.status == TaskStatus.InProgress,
					)"
					:key="task.uid"
					:task="task"
				/>
			</div>
			<div class="kanban-col">
				<KanbanCard
					v-for="task in tasks.filter(task => task.status == TaskStatus.Done)"
					:key="task.uid"
					:task="task"
				/>
			</div>
		</section>
	</article>
</template>

<style scoped lang="scss">
@use "/assets/core" as *;
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.kanban-wrapper {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.kanban-col {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;

	// right margin between each column
	&:not(:last-child)::after {
		position: absolute;
		content: "";
		right: 0;
		top: 0;
		bottom: 0;
		width: 0.2rem;
		border-radius: 100vmax;
		translate: 50% 0;
		background-color: var(--colour-text);
	}
}

// rag-colours = names in css vars
$rag-colours: ("red", "amber", "green");
$index: 1;

// @each $col in $rag-colours {
// 	.kanban-col:nth-child(#{$index}) {
// 		@extend [data-rag="#{$col}"];
// 	}
// 	$index: $index + 1;
// }
</style>

<script setup lang="ts">
import { TaskStatus } from "~~/types"

defineProps<{
	tasks: Task[]
}>()
</script>
