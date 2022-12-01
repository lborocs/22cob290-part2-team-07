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
}
