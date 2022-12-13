export {}

declare global {
	type DateString = string | Date
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
