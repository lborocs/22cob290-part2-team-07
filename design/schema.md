```mermaid
classDiagram
direction TB

User *-- Settings: settings
User --o Task: assignees
Task -- TaskStatus: status
Task --o Task: subtasks
Project o-- Task: tasks
Project o-- Client: client
User --o Project: leader
User --o Post: owner
Topic --o Post: topic
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
	workerHours: number
	createdAt: DateString
	deadline: DateString
	subtasks: Task[]
	project: Project?
	assigned: User[]
	parent: Task
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
	address: string
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
