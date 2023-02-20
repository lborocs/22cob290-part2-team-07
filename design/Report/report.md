---
title: Team 07 Report
subtitle: Part II
author:
  - Arshad Chati
  - Calin Corcimaru
  - Jack Humphrey
  - Adam Hutton
  - Rowan Murphy
  - Thomas Woolhouse
date: February 2023
numbersections: false
documentclass: report
papersize: A4
fontsize: 11pt
geometry: margin=1.25cm
header-includes: |
  \usepackage{sectsty}
---

<!--



To compile: pandoc report.md -o report.pdf

https://pandoc.org/installing.html

winget or apt or whatever also have it iirc

-->

<!--Todo
~~weekly meetings~~
~~WhatsApp communication usage~~
comments
~~github projects and issues~~
link everything to requirements where appropriate
design and implementation are 70% of the marks
10% for referencing
20% for organisation and presentation
-->

# System Design

Our [solution stack](https://en.wikipedia.org/wiki/Solution_stack) consists of: [Vue.js](https://vuejs.org/)^[<https://vuejs.org/>], a client-side reactivity framework; [Nuxt.js](https://nuxt.com/)^[<https://nuxt.com/>], a Vue framework for universal applications; and [Prisma](https://www.prisma.io/)^[<https://www.prisma.io/>], a database ORM.
Every component of this stack supports [TypeScript](https://www.typescriptlang.org/)^[<https://www.typescriptlang.org/>] (TS) which became our language of choice.
This provides type safety in all aspects of our code and requires the team to be proficient in only a single language, making it simpler to share and reuse code as a small team.
Finally, being a TypeScript solution, the server uses [Node.js](https://nodejs.org/)^[<https://nodejs.org/>] for the JavaScript runtime. We were able to easily produce a responsive design[^req-13] and make elements reactive to provide up to date and accurate information, for example: the kanban board[^req-06], which was possible due to the aforementioned libraries.

## Vue

Vue.js is a JavaScript framework for building reactive single-page applications (SPA).
Vue uses composition with reusable, reactive components.
The reactive data-binding system handles updating the DOM whenever the underlying data changes, making development much simpler.
Single File Components (SFCs) are self contained units of the HTML, TS, and CSS which handle both the logic and the rendering.
This gave us an intuitive way of diving up tasks between the team, as everyone could work on individual components while the functionality is reused by another team member.

Additionally, Vue works well with several build tools such as CSS pre-processors, enabling us to easily use SCSS, making it easier to write and maintain styles for the application.

The nature of single-page applications provide fast transitions between pages as well as reducing the load on the server.
The downside of this is a long initial load-time as the client downloads and executes all of the JavaScript to build the DOM. We solved this by introducing [Nuxt](#nuxt).

## Nuxt

Nuxt.js is a meta-framework built on top of [Vue](#vue) which introduces: powerful and flexible file-based routing, RESTful api routes, and server-side rendering (SSR) to improve performance.

Natively providing REST api routes made it simple to integrate accessing the database from [Prisma](#prisma). Each route is mearley a function in Nuxt, and the return value is automatically serialised with JSON. As such, select statements from [Prisma](#prisma) can be returned directly without any transformation.

It uses SSR to initially send the client a fully rendered page, eliminating the draw backs of the traditional SPA. Once the client receives the page, Vue hydrates it, making it fully reactive and response, becoming an SPA which keeps the benefits mentioned before.

## Prisma

<!-- Talk about Prisma in more detail.
  How did we use Prisma in our system?
   What were the benefits provided to our system?
   Also need to talk about database design.
   Why is the database designed the way it is?
   Are there any limitations to the design?
   How does the database design allow us to meet the requirements?
   A graphic for the database design might be nice.-->

Prisma is a database ORM built around type-safety, auto-complete, and simplified relational models. Prisma uses a custom scheme file[^prisma-schema] to define the tables and relationships. It uses the schema to generate the tables in the (MySQL) database as well a build a complete set of types in TS. These generated types are used across the program to validate inputs to functions and Vue components. Because the types come from the schema file, we have 1 source of truth for what defines a User, on the client, server, and database, removing any need to transform the data between these areas of the solution.

Furthermore, Prisma provides type-safe methods to query and manipulate the underlying MySQL database through TS functions, as opposed to using traditional SQL queries. This prevents issues such as SQL injection as well as making it quick to write complex queries as it is handled internally. Another major benefit of prisma, is how the schema file is database agnostic. This means that for development and testing we could use small and simple SQLite databases on our local machines, make changes without worrying about the integrity of the true server using MySQL.

## Specific Implementations

An overview/highlight of a few specific areas of the system.

<!-- TODO: This! -->

### Passwords

Passwords are stored securely in the database and used for logging users in.
They are hashed before storage using the SHA256 algorithm implemented in javascript, based on the public domain one from <https://github.com/geraintluff/sha256>.

### Permissions

Each user can have one or more of the roles 'user', 'manager' and 'admin'.
Managers and administrators can access the permissions page, where specific abilities can be assigned to each role type, and users can be assigned to their roles.
As well as this, specific permissions, such as deleting tasks or managing a project, can be assigned to individual users, which will override the permissions of their role (as per feedback point 11).

### Markdown Converter

A discussed in the online forums, posts can be written and edited in markdown for users who choose to use it.
Instead of spending time implementing a markdown to HTML converter to display the post, we used the library showdown.js [^showdown] to convert the markdown stored in the database to HTML on the server side.
When viewing a post, the markdown is converted to HTML on the server side, and then sent to and displayed in the browser.

### CDN

As per feedback point 12, images are required to be a part of the knowledge management system.
Images can be uploaded to the system, given a unique file name and stored in a CDN folder on the server.
These images can then be used in posts, using the markdown syntax for images, and rendered by the server when a post is viewed.

<!-- ### Charts n Graphs -->

## Database Design

<!-- TODO: DB DESIGN -->

First off, we needed to create a database design.
This was done in a team meeting where we outlined the tables needed, primary keys for each and then any additional tables that were needed to follow data normalization.
During this meeting we produced schema.md[^schema], a markdown file which contains the plan for the database.
This was mostly followed in the final production of the database, with the addition of some other tables needed after clarification of requirements (such as the roles-based permission system).

Now that the initial draft of the database design was complete, we needed to produce the tables and implement data.
Prisma offers a Schema Definition Language (SDL) which is a high level language which defines a simple way to define the structure of the database.
The database is defined in schema.prisma[^prisma-schema], which defines all the tables, their contents and data types and additional fields, for example the user id must be unique.

The use of prisma also integrated well with the use of TypeScript, as it allowed for database queries to be written out in TypeScript instead of SQL, which provides type-safety and increases security by removing the risk of SQL injection attacks on the website.
This allowed the more efficient creation of database calls.

Testing was also a task that prisma aided.
Normally to test the website and the database calls, we would need to run the VM (Virtual Machine) on the GCP (Google Cloud Platform).
This is time consuming and every change we do requires the server to be updated accordingly.
Prisma allowed us to generate a small client database which meant we were able to test database calls within our own computers.
Efficiency was greatly improved due to this feature as we were able to design, build and test all in one go, without unnecessary time spent uploading the changes to the VM.

For example, the knowledge management system uses a large amount of database calls to collect all the necessary information[^req-11].
Prisma not only streamlined development but also the testing, as it allowed quick client side database calls to test the array of features such as the post searching function.

<!--can include and image of the database design from the initial draft, not sure where it is however-->

See the image below for the database ERD (Entity Relationship Diagram):

![Database design](../../prisma/ERD.png)

## GUI (Graphical user interface) design

<!-- Talk about the user interface design.
      Why is it designed in the way that it is (e.g., colour scheme, layout, navigation etc.)?
      How does it meet the requirements?  -->

The GUI (graphical user interface) was designed to meet the clients.
In this light, the system prominently features the Make-It-All Brand colours.
Furthermore, many interface design decisions have been made after conversations on the online forums.
For example, the Kanban style of displaying tasks was a requirement set out by the client which influenced the way that the UI (user interface) was designed.
The UI is designed with usability and accessibility in mind, with tools such as Google's Lighthouse auditing system used to ensure accessibility and reference of A11y^[<https://www.a11yproject.com/>] to ensure compatibility with assistive technologies as much as possible.

Here are the guiding principles which were kept in consideration when completing the design of the system:

- A colour scheme which is easy to read (a strong contrast in colour between the background colour and the text, a font which is readable and colours which are still readable for people with colour blindness).
  This helps make the system easier and faster to use.
- A simple UI which isn’t overcrowded and is easy to follow.
  This helps the usability of the system as it means that no negative functionality is provided to the user (negative functionality is functionality which takes away from the user experience – putting the system further away from the user’s needs).
  The importance of a simple UI is reiterated by the requirements from the client (through the online forums).
- Careful attention paid to the default options which the UI incorporates (e.g., defaulting the knowledge management search function to search for all topics). By using common default options, the system can become more efficient and save the user time.
- A consistent design throughout the whole system.
  Consistency in design helps the user feel more familiar with the system and makes the software more intuitive to new users.

## Changes from prototype

<!-- Talk about feedback given and reasons for implementing these changes.
     How will they affect the system
     Mention that by implementing this feedback, the requirements will be better met.-->

During our presentation to the clients, we received feedback on how our prototype could be improved to better meet the requirements.
In order to make a better system for the client, we have implemented the majority of their feedback.
See table 1 for details.

(Table 1)

| #   | System page          | Feedback                                                                                                                     | Implemented (Yes/No) |
| --- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1   | Dashboard            | Needs to be clear where each task has originated from                                                                        | Yes                  |
| 2   | Dashboard            | Team leaders and managers should be part of one or more teams                                                                | Yes                  |
| 3   | Dashboard            | Could have functionality to swap between Kanban view and task view                                                           | Yes                  |
| 4   | Project              | Calculation of progress should be based on worker-hours of tasks                                                             | Yes                  |
| 5   | Project              | The days remaining until the project deadline should exclude holidays and weekends                                           | Yes                  |
| 6   | Project              | Should be able to change the team leader of a project                                                                        | Yes                  |
| 7   | Project              | Could make use of graphs (e.g., bar chart) to show the allocation of hours, amongst employees, on a project                  | Yes                  |
| 8   | Project              | Each task in the tasks section of the page could have an icon(s) to see who is allocated the task                            | Yes                  |
| 9   | Project              | Could have functionality to show more information about an employee when their icon is hovered over                          | Yes                  |
| 10  | Knowledge management | FAQ page is needed                                                                                                           | Yes                  |
| 11  | Knowledge management | Managers should be able to decide on a person-to-person basis; who can create topics and who can create posts within a topic | Yes                  |
| 12  | Knowledge management | Functionality to upload images to posts is needed                                                                            | Yes                  |
| 13  | Knowledge management | Could search for posts by user                                                                                               | Yes                  |
| 14  | Not page specific    | Shouldn’t highlight the navigation button to “view my profile” page when you are viewing someone else’s page                 | Yes                  |
| 15  | Not page specific    | The navigation bar could show text on hover                                                                                  | Yes                  |

# System Implementation

## Planning and prioritisation of tasks

<!-- Talk about Github Kanban board (potentially add a screenshot of it?).
How did it make us more productive? How did it help us prioritise our work?-->

To implement the system, we first broke the design down into much smaller tasks.
We then needed a method to keep track of the implementation of these tasks.
In order to implement the system in the most efficient manner, we used a Kanban board of our own on GitHub.
Therefore, we could plan the order of the tasks which would be completed and the priority of each task.
The Kanban board also allowed us to assign each task to a team member and track the progression of each task.
This form of productivity management allowed us to build the software in a systematic manner and ensured that we didn’t forget any tasks.

<!-- FIXME: HMMM??? Should you live -->

Our requirements document gave us a clear focus for our development – with “must”, “should” and “could” requirements allowing us to rank the importance of each requirement[^requirements].

## Communication

Throughout the development process we were in constant communication with each-other: weekly meetings, a centralised group chat, GitHub Issues[^gh-issues] and informally throughout the week were all useful means of communication.

During the weekly meetings, we discussed progress, and addressed issues that had come up throughout the week's development.
These meetings also included the initial discussions of what libraries we were going to use including the use of TypeScript and SASS, database design and other decisions we needed to make before development.
Group tasks were also undertaken for example, creating and configuring the server on GCP, as well as the task allocation for the next week.

Online communication, including a group chat, proved to be very useful, as we were able to discuss issues and ask for any help where needed.
Efficiency was the key takeaway from this, as minor issues could be solved without the need for a meeting which meant the weekly meetings were kept on topic and not spent discussing small bugs and errors.

## Prototyping

Before the development process of the system, a throw-away prototype was created to explore the requirements and interface ideas for the client.
This was beneficial for managing the client's expectations and ensuring that their needs and wants were clear before investing time.

The only changes made to the design and proposed functionality of the system were based on feedback of the prototype from the client.

After the client had seen the prototype and given feedback, the prototype was referenced throughout the development process as a part of the interface design.
Development of the final system was then started with the feedback of the client to aid the final systems design and functionality.

## Debugging

The version control mentioned above made debugging much simpler.
Anytime a bug was found with a particular component, the commit history could be used to see the recent changes made to said component.
Usually, the bug lay within one of the recent commits.
Debugging is a useful tool which we utilised thoroughly throughout the development of our system.
It’s important to note that some bugs will always remain.
There comes a point in any project where it is no longer feasible nor cost effective to keep finding and fixing bugs.

Throughout development, we adopted a static software inspection approach to debugging.
A static software inspection is essentially where developers look at code and try to find bugs in it.
This was extremely beneficial to the project as it allowed us to implement debugging at all stages of the development/design and added very little time/monetary cost.
By using static software inspection, we avoided many bugs which ultimately saved us (and the client) time.

<!--realised static inspection is a debugging method and not a testing method-->

## Testing

Throughout the implementation of the system, testing was used to ensure that the requirements of the client had been satisfied.
Our throw-away prototype helped us to test the software.
By presenting a prototype to the client, the client could find errors in the software which we (as developers) perhaps hadn’t noticed.

During development we also tested all functionality when it was first added to the system.
Before any code was committed, it was tested for functionality and bugs to ensure the development was successful and efficient.
In case any bugs were committed, these would be discovered through static inspection and practical testing once major functionality was introduced.

For example, once the project page was produced, it was inspected and then practically tested against the requirements[^req-08].
Then any issues were mentioned in the group chat or Github issue page and the commit was identified and the bug was fixed.

<!-- IMPORTANT: Footnotes -->

[^gh-issues]: Our GitHub issue tracking: <https://github.com/orgs/lborocs/projects/1/>
[^req-01]: From Requirement 01: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#1-log-in--registration-requirements>
[^req-02]: From Requirement 02: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#2-registration-page-requirements--registration-requirements>
[^req-03]: From Requirement 03: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#3-user-requirements>
[^req-04]: From Requirement 04: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#4-team-leader-requirements>
[^req-05]: From Requirement 05: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#5-project-manager-requirements>
[^req-06]: From Requirement 06: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#6-productivity-management-requirements>
[^req-07]: From Requirement 07: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#7-task-requirements>
[^req-08]: From Requirement 08: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#8-project-requirements>
[^req-09]: From Requirement 09: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#9-project-manager>
[^req-10]: From Requirement 10: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#10-manager-dashboard-requirements>
[^req-11]: From Requirement 11: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#11-knowledge-management-requirements>
[^req-12]: From Requirement 12: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#12-client-requirements>
[^req-13]: From Requirement 13: - see: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md#13-system-requirements>
[^schema]: Database Design file : <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/schema.md>
[^prisma-schema]: Prisma Schema file: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/prisma/schema.prisma>
[^requirements]: Requirements document: <https://github.com/lborocs/22cob290-part2-team-07/blob/main/design/requirements.md>
