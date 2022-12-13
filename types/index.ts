import { Project, Subtask, Task, User } from ".prisma/client"

export {}

declare global {
	type DateString = string | Date

	type KanbanTask = Task & {
		project: Project | null | undefined
		assignees: User[]
		subtasks: Subtask[]
	}
}
// cant declare an enum in a global context, must be imported when needed.
export enum TaskStatus {
	Todo,
	InProgress,
	Done,
}

export enum UserRank {
	Employee,
	TeamLeader,
	Manager,
}
