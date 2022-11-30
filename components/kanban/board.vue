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
		dueDate: "2022-12-25",
		workerHours: 1,
		assignees: ["Elon Musk", "Jeff Bezos"],
	},
	{
		id: 1,
		title: "Task 2",
		description: "This is a task",
		state: "todo",
		dueDate: "2022-12-25",
		workerHours: 1,
		assignees: [
			"Alan turing",
			"John Conway",
			"Ada Lovelace",
			"Charles Babbage",
		],
	},
	{
		id: 2,
		title: "Task 3",
		description: "This is a task",
		state: "current",
		dueDate: "2022-12-25",
		workerHours: 1,
	},
	{
		id: 3,
		title: "Task 4",
		description: "This is a task",
		state: "done",
		dueDate: "2022-12-25",
		workerHours: 1,
	},
	{
		id: 4,
		title: "Task 5",
		description: "This is a task",
		state: "current",
		dueDate: "2022-12-25",
		workerHours: 1,
	},
	{
		id: 5,
		title: "Task 6",
		description: "This is a task",
		state: "todo",
		dueDate: "2022-12-25",
		workerHours: 1,
	},
	{
		id: 10,
		title: "Task 11",
		description: "This is a task",
		state: "done",
		dueDate: "2022-12-25",
		workerHours: 1,
	},
])
</script>
