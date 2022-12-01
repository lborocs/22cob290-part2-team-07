export {}

declare global {
	interface User {
		readonly uid: number
		email: string
		name: string
	}

	interface Topic {
		readonly uid: number
		name: string
	}

	interface Post {
		readonly uid: number
		topics: Topic[]
		owner: User
		title: string
		markdown: string
		created: Date
	}

	interface Task {
		readonly uid: number
		name: string
		description: string
		workerHours: number
		assignees: User[]
		status: TaskStatus
		subtasks?: Task[]
		project?: Project
	}

	// TODO finish
	interface Project {
		readonly uid: number
		name: string
	}
}

// cant declare an enum in a global context, must be imported when needed.
export enum TaskStatus {
	Todo,
	InProgress,
	Done,
}
