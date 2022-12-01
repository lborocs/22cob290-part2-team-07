import { TaskStatus } from "~~/types"

export default defineEventHandler(event => {
	return <Task[]>[
		{
			uid: 1,
			name: "Task 1",
			description: "Task 1 description",
			workerHours: 1,
			assignees: [],
			status: TaskStatus.Todo,
		},
		{
			uid: 2,
			name: "Task 2",
			description: "Task 2 description",
			workerHours: 2,
			assignees: [],
			status: TaskStatus.Todo,
		},
		{
			uid: 3,
			name: "Task 3",
			description: "Task 3 description",
			workerHours: 3,
			assignees: [],
			status: TaskStatus.Todo,
		},
	]
})
