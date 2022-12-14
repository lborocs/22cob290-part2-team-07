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

export enum UserRank {
	Employee,
	TeamLeader,
	Manager,
}
