```mermaid
classDiagram
direction TB

User *-- Settings: settings
User o--o Task: assignees
Task -- TaskStatus: status
Task o-- Subtask: subtasks
Project o-- Task: tasks
Project o-- Client: client
User --o Project: leader
User o--o Post: owner
Topic o--o Post: topic
Post *--o Asset: references

class User {
	uid: string
	email: string
	name: string
	password: string
	leads: Project[]
	assigned: Task[]
	posts: Post[]
}

class Task {
	uid: number
	name: string
	description: string
	status: TaskStatus
	createdAt: DateString
	deadline: DateString
	workerHours: number
	subtasks: Task[]
	project: Project?
	assignees: User[]
}

class Subtask {
	uid: number
	name: string
	parent: Task
	workerHours: number
	done: boolean
}

class TaskStatus {
	<<enum>>
	A = 0
	B = 1
	C = 2
}

class Project {
	uid: number
	leader: User
	client: Client
	name: string
	description: string
	createdAt: DateString
	deadline: DateString
	tasks: Task[]
}

class Client {
	uid: number
	name: string
	representative: string
	email: string
	phone: string?
	website: string?
	address: string?
	projects: Project[]
}

class Topic {
	uid: number
	name: string
	posts: Post[]
}

class Post {
	uid: number
	owner: User
	topic: Topic
	title: string
	markdown: string
	createdAt: DateString
	updatedAt: DateString
	assets: Asset[]
}

class Asset {
	uid: string
	posts: Post[]
}

class Settings {
	theme: boolean
	kanbanView: boolean
}
```
