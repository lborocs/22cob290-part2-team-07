```mermaid
erDiagram

User {
	number uid PK
	string email
	string name
	hash password
	number settings
}

Task {
	number uid PK
	~number~ userId FK
	~number~ projectId FK
	~number~ parentTaskId FK
	string name
	string description
	number workerHours
	StatusEnum status
	deadline datetime
}

TaskAssignment {
	number taskId FK
	number userId FK
}

Project {
	number uid PK
	number leaderId FK
	number clientId FK
	string name
	string description
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
	number uid PK
	string name
}

Post {
	number uid PK
	number ownerId FK
	number topicId FK
	string title
	Datetime created
	string markdown
}

Task }o..|| Project : projectId
Task ||..o{ Task: parentTaskId

User ||--o{ Project: leaderId
User ||..o{ Task: userId

Task ||--|{ TaskAssignment: taskId
User ||--|{ TaskAssignment: userId

User ||--|{ Post: ownerId
Topic ||--|{ Post: topicId

Project }|--|| Client: clientId
```

## Settings

A bitfield of the following properties specified in order of LSB.

- theme
- kanbanView

## Permissions

- create topics.
- who can post in said topic.
- who can edit an existing post.
- who can edit permissions of users.
- who can access the manager dashboard.
- who can assign people to a task.
- who can create a project.
- who can create a client.
- create a task (in a project).
- who can invite a user to a system???
- who can see a post.

## Extra Features

see all posts by a certain user
