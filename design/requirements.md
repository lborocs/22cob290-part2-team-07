# Requirements

Requirements are taken from the client specification letter unless stated otherwise by a footnote.

## 1. Log in / Registration requirements.

1. A user **must** be able to login to the system using their work email and password.
2. The email address used for logging in **must** be using the `@make-it-all.co.uk` domain.
3. A user **must** be registered in order to log in to the system.

## 2. Registration Page Requirements & Registration Requirements.

1. The system **must** allow existing users to invite new users to register to the system using their work email.
2. A member of staff **must** be able to register only one account in the system.
3. The email address used for registering **must** be using the `@make-it-all.co.uk` domain.
4. The password used for registering **must** be at least 12 characters long and contain a combination of at least one uppercase letter, one lowercase letter, a number, and a special character (!@#$%^&\*).[^358985]
5. A confirmation email **could** be sent out to the email address used for registration to check for a valid email.[^358983p554513]

## 3. User requirements

1. The system **must** allow a user to have at least one of the following roles: Employee, Team leader or Project Manager.
2. The system **must** allow a user to have different permissions dependant on their currently assigned role.[^355151p554145]
3. A user **must** be able to be assigned to a project.[^355047]
4. A user **must** be able to work on any number of projects.[^355049]
5. A user **must** be able to create a private task for their private to-do list.[^355053p549541]
<!-- 6. A user **should** be able to be part of multiple teams. -->

## 4. Team leader requirements

1. A team **must** have a team leader.
2. The system **must** allow any user to be a team leader.[^355151p554145]
3. The system **must** allow a user to be a team leader for multiple projects.[^355151p554145]
4. A team leader **must** be able to manage the members of their team (add, remove).[^355151p554145]
5. A team leader **must** be able to assign tasks to users in their team.[^355075p549565]
6. A team leader **must** be able to create tasks for a project they supervise.[^355151p554145]
7. A team leader **must** be able to track task progress of a project.

## 5. Project Manager requirements

1. A project manager **must** be able to manage all the projects in the system.[^355151p554145]
2. A project manager **must** be able to add tasks to any current project.[^355151p554145]
3. A project manager **must** be able to assign users to project tasks.[^355151p554145]
4. A project manager **must** be able to create a new project.[^355151p554145]
5. A project manager **must** be able to assign users to a team.[^355151p554145]

## 6. Productivity Management requirements

1. A user **must** have access to their private to-do list, which is a user's personal to-do list containing tasks that are not related to any Projects.[^355053p549541]
2. A user **must** have access to their personal dashboard, which will contain task they are assigned to from Projects they are working on and their own private todo list.
3. The board **must** have columns in the 'Kanban' view that tasks can be placed in.[^356809]
4. The system **should** allow users to switch between a Kanban and 'to-do list' view.[^356809]

## 7. Task requirements

1. A task **must** have a name that will be displayed.
2. A task **should** have a description.
3. A task **must** have a date for a deadline.[^355045p549487]
4. A task **must** have an estimated number of worker-hours needed to complete the task.[^355051p549539]
5. A task **should** have the option of being divided into smaller sub-tasks. A sub-task is a task, that the parent tasks depends on.[^355051p549539]
6. If a task has sub-tasks, then its worker-hours **should** be calculated as a sum of the worker-hours of the smaller tasks.[^355051p549539]
7. A task **must** be able to display the current state it is in. (To-Do, In Progress, Complete).[^355051p549539]
8. A task with subtasks **should** display the percentage of sub-tasks that are completed.[^355051p549539]
9. A task **should** be able to be categorized as either a Project-specific (select which Project) or private task (not related to any project).[^355053p549541]
10. The system **should** allow a Project Manager/Team leader to modify and re-assign a Task.[^359721p554115]
11. The system **could** allow a Sub-Task to be divided into multiple Sub-Tasks.[^355051p549539]

## 8. Project requirements

1.  A Project **must** have a title.[^355047p549501]
2.  A Project **should** have a description.
3.  A Project **must** have a date for a deadline.[^355067p549557]
4.  A Project **must** have a progress displayed, which is measured by the percentage of tasks completed.[^355063p549553]
5.  A Project **must** have a client.[^355047p549501]
6.  A Project **must** have a team assigned to it.[^355047]
7.  The system **should** allow a user to view the team members of their Project.
8.  The system **should** allow a user to view their assigned tasks if they are part of a Project.
9.  The system **must** allow a Project to be created by a Manager.[^355151p554145]

## 9. Project Manager

1. The project manager **should** be able to access and manage any Project details from their dashboard.[^355039p546189]
2. The system **should** allow a project manager to manage teams and users that are assigned to any Project.[^355151p549485]

\pagebreak

## 10. Manager dashboard requirements

1.  The manager dashboard **should** allow a team leader or project manager be able to see how many tasks and total worker-hours a user currently has assigned.
2.  The manager dashboard **should** display a warning to a Project Manager/Team Leader if a user's assigned effort load exceeds 37.5 worker hours per week.[^355067p554135]
3.  The Project tasks **could** be able to be filtered based on Project or team member assigned to it.
4.  A Project **should** display whether it is sufficiently resourced. This is determined based on the sum of worker-hours required by its tasks, the number of workers assigned (and their daily work capacity) and the Project's deadline.[^355067p554135]
5.  The manager dashboard **could** display a warning to a Project Manager/Team Leader if the project is expected to fall behind the deadline, based on worker hours.
6.  A manager/team leader **could** be warned that a employee needs training if they are behind a deadline or having trouble working on a specific task.[^355071p549561]

## 11. Knowledge Management requirements

1. The system **must** allow a user to create a new post.
2. The knowledge management subsystem **must** have a search functionality where a User can search Posts by specific Topics.[^357789p550055]
3. Posts **must** be viewable by all users by default.[^355057p549547]
4. The system **could** allow to change the permissions of accessing specific Posts only by an employee with certain permissions.[^355057p549547]
5. Posts **must** only be able to be edited by a Manager or the User who has created it.[^355055p549545]
6. The subsystem **could** contain a FAQ page.[^357789p550055]
7. The subsystem **should** offer users a way to contact author of post for specific questions.[^357789p550055]
8. A Post **must** only have 1 topic assigned to it.[^355043p549491]
9. The system **must** allow a Topic have multiple Posts.[^355043p549491]

## 12. Client requirements

1. A Client **must** have key information including Company name, Client Representative, Office Address, and Contact Information.[^355047p550039]
2. The system **must** allow a new Client to be added.

## 13. System Requirements

1. The system **must** have a responsive design that will cater for different platforms and screen sizes.[^355077p545293]
2. The system **must** be able to be accessed 24 hours a day.
3. A user **should** be directed to the employee dashboard after logging in.
4. The system **could** be accessed via a dedicated web address.
5. The system **must** follow the GDPR regulations.

[^358985]: 04/11/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=358985>

[^358983p554513]: 04/11/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=358983#p554513>

[^355047]: 22/10/2022 https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355047>

[^355049]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355049>

[^355053p549541]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355053#p549541>

[^355151p554145]: 04/11/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355151#p554145>

[^355075p549565]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355075#p549565>

[^356809]: 14/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=356809>

[^355045p549487]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355045#p549487>

[^355051p549539]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355051#p549539>

[^355047p549501]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355047#p549501>

[^355067p549557]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355067#p549557>

[^355063p549553]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355063#p549553>

[^355039p546189]: 13/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355039#p546189>

[^355151p549485]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355151#p549485>

[^355067p554135]: 04/11/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355067#p554135>

[^355071p549561]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355071#p549561>

[^357789p550055]: 24/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=357789#p550055>

[^355057p549547]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355057#p549547>

[^355055p549545]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355055#p549545>

[^355043p549491]: 22/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355043#p549491>

[^355047p550039]: 24/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355047#p550039>

[^355077p545293]: 11/10/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=355077#p545293>

[^359721p554115]: 04/11/2022 <https://learn.lboro.ac.uk/mod/forum/discuss.php?d=359721#p554115>
