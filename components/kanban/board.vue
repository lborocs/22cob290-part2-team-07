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
					v-for="task in tasks.filter(task => task.state == 'todo')"
					:key="task.id"
					:task="task"
				/>
			</div>
			<div class="kanban-col">
				<KanbanCard
					v-for="task in tasks.filter(task => task.state == 'current')"
					:key="task.id"
					:task="task"
				/>
			</div>
			<div class="kanban-col">
				<KanbanCard
					v-for="task in tasks.filter(task => task.state == 'done')"
					:key="task.id"
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
	.card-small {
		width: 100%;
		margin-inline: auto;
	}
}

// rag-colours = names in css vars
$rag-colours: ("red", "amber", "green");
$index: 1;
@each $col in $rag-colours {
	.kanban-col:nth-child(#{$index}) {
		@extend [data-rag="#{$col}"];
	}
	$index: $index + 1;
}
</style>

<script setup>
const tasks = ref([
	{
		id: 0,
		title: "Task 1",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 1,
		title: "Task 2",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 2,
		title: "Task 3",
		description: "This is a task",
		state: "current",
	},
	{
		id: 3,
		title: "Task 4",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 4,
		title: "Task 5",
		description: "This is a task",
		state: "current",
	},
	{
		id: 5,
		title: "Task 6",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 6,
		title: "Task 7",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 7,
		title: "Task 8",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 8,
		title: "Task 9",
		description: "This is a task",
		state: "done",
	},
	{
		id: 9,
		title: "Task 10",
		description: "This is a task",
		state: "todo",
	},
	{
		id: 10,
		title: "Task 11",
		description: "This is a task",
		state: "todo",
	},
])
</script>
