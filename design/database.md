```mermaid
erDiagram

User {
	number uid PK
	string email
	string name
	number password
	number settings
}

Task {
	number uid PK
	~number~ userId FK
	~number~ projectId FK
	~number~ parentTaskId FK
	number workerHours
	StatusEnum status
}

TaskAssignment {
	number taskId FK
	number userId FK
}

Team {
	number userId FK
	number projectId FK
}

User ||--o{ Project: Leads
Project {
	number uid PK
	number leaderId FK
	number clientId FK
	string name
	string desc
	datetime deadline
}

Client {
	number uid PK
	string name
	string representative
	string email
	string address
	number phone
	string website
}

Topic {
	number uid
	string name
}

Post {
	number uid
	number ownerId FK
	number topicId FK
	string title
	Datetime created
	string markdown
}
```

Permissions {
	create topics.
	who can post in said topic.
	who can edit an existing post.
	who can edit permissions of users.
	who can access the manager dashboard.
	who can assign people to a task.
	who can create a project.
	who can create a client.
	create a task (in a project).
	who can invite a user to a system???
	who can see a post.
}
see all posts by a certain user
