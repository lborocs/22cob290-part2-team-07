export {}

declare global {
	type DateNumber = number

	interface User {
		readonly uid: number
		email: string
		name: string
		rank: UserRank
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
		created: DateNumber
	}

	interface Task {
		readonly uid: number
		name: string
		description: string
		workerHours: number
		assignees: User[]
		status: TaskStatus
		deadline: DateNumber
		subtasks?: Task[]
		project?: Project
	}

	interface Project {
		readonly uid: number
		name: string
		description: string
		tasks?: Task[]
		deadline: Date
		leader: User
	}

	interface Client {
		readonly uid: number
		name: string
		representative: string
		email: string
		phone: string
		website: string
		address: string
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
