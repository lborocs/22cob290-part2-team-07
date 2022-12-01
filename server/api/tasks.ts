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
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 2,
			name: "Task 2",
			description: "Task 2 description",
			workerHours: 2,
			assignees: [],
			status: TaskStatus.InProgress,
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 3,
			name: "Task 3",
			description: "Task 3 description",
			workerHours: 3,
			assignees: [],
			status: TaskStatus.Todo,
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 4,
			name: "Task 4",
			description: "Task 4 description",
			workerHours: 4,
			assignees: [],
			status: TaskStatus.Done,
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 5,
			name: "Task 5",
			description: "Task 5 description",
			workerHours: 5,
			assignees: [],
			status: TaskStatus.InProgress,
			deadline: new Date("2022-12-25").getTime(),
		},
	]
})
