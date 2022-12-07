import { TaskStatus } from "."

const statuses = ["Todo", "In Progress", "Done"]
export function statusName(status: TaskStatus): string {
	return statuses[status]
}
