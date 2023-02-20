# Requirements

Requirements are taken from the client specification letter unless stated otherwise by a footnote.

## 1. Log in / Registration requirements.

- [x] 1 A user **must** be able to login to the system using their work email and password.
- [x] 2 The email address used for logging in **must** be using the `@make-it-all.co.uk` domain.
- [x] 3 A user **must** be registered in order to log in to the system.

## 2. Registration Page Requirements & Registration Requirements.

- [x] 1 The system **must** allow existing users to invite new users to register to the system using their work email.
- [x] 2 A member of staff **must** be able to register only one account in the system.
- [x] 3 The email address used for registering **must** be using the `@make-it-all.co.uk` domain.
- [x] 4 The password used for registering **must** be at least 12 characters long and contain a combination of at least one uppercase letter, one lowercase letter, a number, and a special character (!@#$%^&\*).
- [ ] 5 A confirmation email **could** be sent out to the email address used for registration to check for a valid email.

## 3. User requirements

- [x] 1 The system **must** allow a user to have at least one of the following roles: Employee, Team leader or Project Manager.
- [x] 2 The system **must** allow a user to have different permissions dependant on their currently assigned role.
- [x] 3 A user **must** be able to be assigned to a project.
- [x] 4 A user **must** be able to work on any number of projects.
- [x] 5 A user **must** be able to create a private task for their private to-do list.


## 4. Team leader requirements

- [x] 1 A team **must** have a team leader.
- [x] 2 The system **must** allow any user to be a team leader.
- [x] 3 The system **must** allow a user to be a team leader for multiple projects.
- [x] 4 A team leader **must** be able to manage the members of their team (add, remove).
- [x] 5 A team leader **must** be able to assign tasks to users in their team.
- [x] 6 A team leader **must** be able to create tasks for a project they supervise.
- [x] 7 A team leader **must** be able to track task progress of a project.

## 5. Project Manager requirements

- [x] 1 A project manager **must** be able to manage all the projects in the system.
- [x] 2 A project manager **must** be able to add tasks to any current project.
- [x] 3 A project manager **must** be able to assign users to project tasks.
- [x] 4 A project manager **must** be able to create a new project.
- [x] 5 A project manager **must** be able to assign users to a team.

## 6. Productivity Management requirements

- [x] 1 A user **must** have access to their private to-do list, which is a user's personal to-do list containing tasks that are not related to any Projects.
- [x] 2 A user **must** have access to their personal dashboard, which will contain task they are assigned to from Projects they are working on and their own private todo list.
- [x] 3 The board **must** have columns in the 'Kanban' view that tasks can be placed in.
- [x] 4 The system **should** allow users to switch between a Kanban and 'to-do list' view.

## 7. Task requirements

- [x] 1 A task **must** have a name that will be displayed.
- [x] 2 A task **should** have a description.
- [x] 3 A task **must** have a date for a deadline.
- [x] 4 A task **must** have an estimated number of worker-hours needed to complete the task.
- [x] 5 A task **should** have the option of being divided into smaller sub-tasks. A sub-task is a task, that the parent tasks depends on.
- [x] 6 If a task has sub-tasks, then its worker-hours **should** be calculated as a sum of the worker-hours of the smaller tasks.
- [x] 7 A task **must** be able to display the current state it is in. (To-Do, In Progress, Complete).
- [x] 8 A task with subtasks **should** display the percentage of sub-tasks that are completed. _(superceded by client's new progress calculation based on worker hours)_
- [x] 9 A task **should** be able to be categorized as either a Project-specific (select which Project) or private task (not related to any project).
- [x] 10. The system **should** allow a Project Manager/Team leader to modify and re-assign a Task.
- [ ] 11. The system **could** allow a Sub-Task to be divided into multiple Sub-Tasks **(cancelled)**.

## 8. Project requirements

- [x] 1 A Project **must** have a title.
- [x] 2 A Project **should** have a description.
- [x] 3 A Project **must** have a date for a deadline.
- [x] 4 A Project **must** have a progress displayed, which is measured by the percentage of tasks completed _(superceded by client's new progress calculation based on worker hours)_.
- [x] 5 A Project **must** have a client.
- [x] 6 A Project **must** have a team assigned to it.
- [x] 7 The system **should** allow a user to view the team members of their Project.
- [x] 8 The system **should** allow a user to view their assigned tasks if they are part of a Project.
- [x] 9 The system **must** allow a Project to be created by a Manager.

## 9. Project Manager

- [x] 1 The project manager **should** be able to access and manage any Project details from their dashboard.
- [x] 2 The system **should** allow a project manager to manage teams and users that are assigned to any Project.

## 10. Manager dashboard requirements

- [x] 1 The manager dashboard **should** allow a team leader or project manager be able to see how many tasks and total worker-hours a user currently has assigned.
- [x] 2 The manager dashboard **should** display a warning to a Project Manager/Team Leader if a user's assigned effort load exceeds 37.5 worker hours per week.
- [x] 3 The Project tasks **could** be able to be filtered based on Project or team member assigned to it.
- [x] 4 A Project **should** display whether it is sufficiently resourced. This is determined based on the sum of worker-hours required by its tasks, the number of workers assigned (and their daily work capacity) and the Project's deadline.
- [ ] 5 The manager dashboard **could** display a warning to a Project Manager/Team Leader if the project is expected to fall behind the deadline, based on worker hours.
- [ ] 6 A manager/team leader **could** be warned that a employee needs training if they are behind a deadline or having trouble working on a specific task.

## 11. Knowledge Management requirements

- [x] 1 The system **must** allow a user to create a new post.
- [x] 2 The knowledge management subsystem **must** have a search functionality where a User can search Posts by specific Topics.
- [x] 3 Posts **must** be viewable by all users by default.
- [x] 4 The system **could** allow to change the permissions of accessing specific Posts only by an employee with certain permissions.
- [x] 5 Posts **must** only be able to be edited by a Manager or the User who has created it.
- [x] 6 The subsystem **could** contain a FAQ page.
- [x] 7 The subsystem **should** offer users a way to contact author of post for specific questions.
- [x] 8 A Post **must** only have 1 topic assigned to it.
- [x] 9 The system **must** allow a Topic have multiple Posts.

## 12. Client requirements

- [x] 1 A Client **must** have key information including Company name, Client Representative, Office Address, and Contact Information.
- [x] 2 The system **must** allow a new Client to be added.

## 13. System Requirements

- [x] 1 The system **must** have a responsive design that will cater for different platforms and screen sizes.
- [x] 2 The system **must** be able to be accessed 24 hours a day.
- [x] 3 A user **should** be directed to the employee dashboard after logging in.
- [ ] 4 The system **could** be accessed via a dedicated web address.
- [x] 5 The system **must** follow the GDPR regulations.
