export {}

declare global {
	interface User {
		readonly id: number
		email: string
		name: string
	}

	interface Topic {
		readonly id: number
		name: string
	}
}
