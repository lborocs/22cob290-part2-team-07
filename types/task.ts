import { Subtask, Task } from ".prisma/client"

export enum TaskStatus {
	Todo,
	InProgress,
	Done,
}

const statuses = ["Todo", "In Progress", "Done"]
export function statusName(status: TaskStatus): string {
	return statuses[status]
}

export function workerHours(task: Task & { subtasks: Subtask[] }) {
	if (task.subtasks.length <= 0) return task.workerHours
	return task.subtasks.reduce(
		(total, subtask) => total + subtask.workerHours,
		0,
	)
}
