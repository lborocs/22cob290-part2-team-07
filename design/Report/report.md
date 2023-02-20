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

Our [solution stack](https://en.wikipedia.org/wiki/Solution_stack) consists of:
[Vue.js](https://vuejs.org/)^[<https://vuejs.org/>], a client-side reactivity framework, [Nuxt.js](https://nuxt.com/)^[<https://nuxt.com/>], a Vue framework for universal applications and, [Prisma](https://www.prisma.io/)^[<https://www.prisma.io/>], a database ORM.
Every component of this stack supports [TypeScript](https://www.typescriptlang.org/)^[<https://www.typescriptlang.org/>] (TS), which is our language of choice.
By utilizing TS, we can ensure type safety in all aspects of our code and make it simpler to share and reuse code as a small team as everyone only has to be proficient in a single language.
Finally, the server uses [Node.js](https://nodejs.org/)^[<https://nodejs.org/>] for the JavaScript runtime.

We were able to easily produce a responsive system[^req-13] and make its elements reactive to provide dynamic, up to date and accurate information. An example of such element is the kanban board[^req-06], its functionality possible due to the aforementioned libraries.

The next few paragraphs will discuss our [solution stack](https://en.wikipedia.org/wiki/Solution_stack) in more detail.

## Vue

Vue.js is a JavaScript framework for building reactive single-page applications (SPA).
It uses composition with reusable and reactive components.
The reactive data-binding system handles updating the DOM whenever the underlying data changes, making development much simpler.
Single File Components (SFCs) are self-contained units of the HTML, TS, and CSS which handle both the logic and the rendering.
This gave us an intuitive way of diving up tasks between the team, as everyone could work on an individual component and also allowed for reusability across the whole system, saving time and streamlining development.

Additionally, Vue works well with several build tools such as CSS pre-processors, enabling us to easily use SCSS, making it easier to write and maintain styles for the created components.

The nature of single-page applications provide fast transitions between pages as well as reducing the load on the server.
The downside of this is a long initial load-time as the client downloads and executes all of the JavaScript to build the DOM. We solved this by introducing [Nuxt](#nuxt).

## Nuxt

Nuxt.js is a meta-framework built on top of [Vue](#vue) which introduces: powerful and flexible file-based routing, RESTful api routes, and server-side rendering (SSR) to improve performance.

Natively providing REST api routes made it simple to integrate accessing the database from [Prisma](#prisma). Each route is a function in Nuxt, and the return value is automatically serialised with JSON. As such, select statements from [Prisma](#prisma) can be returned directly without any transformation.

It uses SSR to initially send the client a fully rendered page, eliminating the drawbacks of the traditional SPA. Once the client receives the page, Vue hydrates it, making it fully reactive and responsive, becoming an SPA which keeps the benefits mentioned before.

## Prisma

<!-- Talk about Prisma in more detail.
  How did we use Prisma in our system?
   What were the benefits provided to our system?
   Also need to talk about database design.
   Why is the database designed the way it is?
   Are there any limitations to the design?
   How does the database design allow us to meet the requirements?
   A graphic for the database design might be nice.-->

Prisma is a database ORM built around type-safety, auto-complete, and simplified relational modals. Prisma uses a custom scheme file[^prisma-schema] to define the tables and relationships. It uses this schema to then generate tables in the MySQL database and build a complete set of types in TS. These generated types are used across the program to validate inputs to functions and Vue components. Because the types come from the schema file, we have 1 source of truth for what defines a User, client, server, or database - thus removing any need to transform the data between these areas of the solution.

Furthermore, Prisma provides type-safe methods to query and manipulate the underlying MySQL database through TS functions, as opposed to using traditional SQL queries. This prevents issues such as SQL injection as well as making it quick to write complex queries as it is handled internally. Another major benefit of Prisma, is how the schema file is database agnostic. This means that for development and testing, we could use small and simple SQLite databases on our local machines, make changes without worrying about the integrity of the server using MySQL.

## Specific Implementations

The next paragraphs will provide an overview of a few specific areas in the system.

<!-- TODO: This! -->

### Passwords

Passwords are stored securely in the database and used for allowing users access to the system.
They are hashed before storage using the SHA256 algorithm implemented in javascript, based on <https://github.com/geraintluff/sha256>.

### Permissions

Each user can have one or more of the following roles: 'user', 'leader', 'manager' and 'admin'.
Managers and administrators can access the permissions page, where specific abilities can be assigned to each role type. On the same page, other users can be assigned to a specific role type.
If necessary, specific permissions, such as deleting tasks or managing a project, can be assigned to individual users, which will override the permissions of their role (as per feedback point 11, see Table 1).

### Markdown Converter

Based on our communication with client representatives, posts can be written and edited in markdown for users who choose to use it.
Instead of spending time implementing a markdown to HTML converter to display the post, we used the library showdown.js [^showdown] to convert the markdown stored in the database to HTML on the server side.
When viewing a post, the markdown is converted to HTML on the server side, then sent to and displayed in the browser.

### CDN

As per feedback point 12 (see Table 1), uploading images is a required functionality for the knowledge management subsystem.
Based on this requirement, we've implemented functionality that allows images to be uploaded to the system, given a unique file name and stored in a CDN folder on the server.
These images can then be used in posts, using the markdown syntax for images, and rendered by the server when a post is viewed.

<!-- ### Charts n Graphs -->

## Database Design

<!-- TODO: DB DESIGN -->

The first step for creating a database for our system was agreeing on its design.
This was done in a team meeting where the tables, primary keys, and any additional tables (that were needed to follow data normalization) were outlined.
During this meeting schema.md[^schema] was produced, which is a markdown file containing the plan for the database.
The schema was closely followed up to the final production of the database, with only the addition of a few other tables necessary after some additional clarification of requirements (roles-based permission system).

The next step after the initial draft creation of the database design was producing the tables and implementing the data.
Prisma offers a Schema Definition Language (SDL) which is a high-level language that defines a simple way to define the structure of the database.
The database is defined in schema.prisma[^prisma-schema], which defines all the tables, their contents, data types and any additional restrictions (such as the user id being unique).

The use of Prisma also integrated well with the use of TypeScript, as it allowed for database queries to be written out in TypeScript instead of SQL. This provided type-safety and increased security by removing the risk of SQL injection attacks on the website.
It also allowed a more efficient use and creation of database calls.

Testing was also a task that Prisma aided.
Normally, testing the website and the database calls would require running the VM (Virtual Machine) on the GCP (Google Cloud Platform).
However, this is time-consuming and every change to the source code requires it be re-deployed to the server.
Prisma allowed us to generate a small client database, making it possible for team members to test database calls on their own machines.
Thus, efficiency was greatly improved as we were able to design, build and test all in one go, without unnecessary time spent uploading the changes to the VM.

For example, the knowledge management system uses a large amount of database calls to collect all the necessary information[^req-11].
Prisma not only streamlined development but also testing, as it allowed quick client-side database calls to test the array of features such as the post searching function.

<!--can include and image of the database design from the initial draft, not sure where it is however-->

See the image below for the database ERD (Entity Relationship Diagram):

![Database design](../../prisma/ERD.png)

## GUI (Graphical user interface) design

<!-- Talk about the user interface design.
      Why is it designed in the way that it is (e.g., colour scheme, layout, navigation etc.)?
      How does it meet the requirements?  -->

The GUI (graphical user interface) was designed to meet the client's requirements.
The system prominently features the Make-It-All Brand colours, such as yellow, black and gray.
Furthermore, many interface design decisions have been made after communicating with client representatives.
For example, the ability to change to a Kanban style view of displaying tasks was a requirement set out by the client. This in turn influenced the way that the UI (user interface) was designed down the line.
The UI is also designed with usability and accessibility in mind, with tools such as Google's Lighthouse auditing system used to ensure accessibility and reference of A11y^[<https://www.a11yproject.com/>] to ensure compatibility with assistive technologies as much as possible.

Here are the guiding principles which were kept in consideration when completing the design of the system:

- A colour scheme which is easy to read (a strong contrast in colour between the background colour and the text, a font which is readable and usage of colours which are readable for people with colour blindness).
  This helps make the system easier and faster to use.
- A simple UI which isn’t overcrowded and is easy to follow.
  This helps the usability of the system as it means that no negative functionality is provided to the user (negative functionality is functionality which takes away from the user experience – putting the system further away from the user’s needs).
  The importance of a simple UI is reiterated by the communicated client requirements.
- Careful attention paid to the default options which the UI incorporates (e.g., defaulting the knowledge management search function to search for all topics). By using common default options, the system can become more efficient and save the user time.
- A consistent design throughout the whole system.
  Consistency in design helps the user feel more familiar with the system and makes the software more intuitive to new users.

## Changes from prototype

<!-- Talk about feedback given and reasons for implementing these changes.
     How will they affect the system
     Mention that by implementing this feedback, the requirements will be better met.-->

During our presentation to the client representatives, we received feedback on how our prototype could be improved to better meet the client requirements.
In order to make a better system for the client, we have implemented the majority of the given feedback.
See the table below (Table 1) for feedback details and whether it was implemented.

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

To develop the system, it was necessary to break it down into smaller tasks/components.
To keep track of the tasks' implementation and progress, we used a Kanban board that was created on our GitHub repository page. The Kanban board was divided into 4 categories ('To-do', 'In Progress', 'Needs Polish' and 'Done') and then populated with tasks and issues related to the development of the system.
Therefore, we could plan the development of different components and their priority.
The Kanban board also allowed us to assign each task to a team member and track the progression of each task.
This form of productivity management allowed us to build the software in a systematic manner and ensured that we didn’t forget any tasks and any existing issues were eventually dealt with.

<!-- FIXME: HMMM??? Should you live -->

Our requirements document also gave us a clear focus for our development – with “must”, “should” and “could” categories allowing us to rank the importance of each requirement[^requirements].

## Communication

Throughout the development process the team was in constant communication with each-other: via weekly meetings, a centralised group chat and GitHub Issues[^gh-issues].

During the weekly meetings, progress was discussed and any issues that came up throughout the week's development were addressed.
These meetings also included the initial discussions of what libraries we were going to use including the use of TypeScript and SASS, database design and other decisions we needed to make before development.
Group tasks were also undertaken for creating and configuring the server on GCP, as well as the task allocation for the next week.

Online communication, including a group chat, proved to be very useful, as issues were quickly discussed and support provided, if necessary.
Efficiency was the key takeaway from our communication, as minor issues could be solved without the need for a meeting, meaning the weekly meetings were kept on topic and not spent discussing unimportant or unnecessary topics.

## Prototyping

Before the development process of the system, a throw-away prototype was created to explore the initial requirements and interface ideas for the client.
This was beneficial for managing the client's expectations and ensuring that their needs and wants were better understood before the main system was developed.

The changes made to the design and functionality of the system were based on feedback of the prototype, received from the client (see Table 1).

After the client had seen the prototype and given feedback, the prototype was used as a reference throughout the development process.
Development of the final system was done with the client feedback in mind to support the final systems design and functionality.

## Debugging

Version control usage, which was mentioned in the paragraphs above, made debugging much simpler.
Anytime a bug was found, the commit history would have been used to find it within the recent changes.
Debugging is a useful tool which we utilised thoroughly throughout the development of our system.
However, it’s important to note that some bugs will always remain, and based on given deadlines and resource limitations, may not be cost-effective to fix them immediately (unless they are of critical importance).

Throughout development, the team adopted a static software inspection approach to debugging, which represents a method where a developer looks at the code and try to find the issue with it.
Using this debugging method was extremely beneficial to the project as it allowed the team to remove any issues that appeared during the development process. Similarly, this method added little resource cost and allowed us to avoid multiple issues with the system in the long run.

<!--realised static inspection is a debugging method and not a testing method-->

## Testing

Throughout the implementation of the system, testing was used to ensure that the requirements of the client had been satisfied.
First of all, the throw-away prototype helped us to test an initial implementation of the system.
Further on, by presenting this prototype to the client, errors and missing functionality were discovered and ironed out, allowing the team to better understand the client requirements.

During the development process, all functionality was tested first before being added to the system.
Next, before any code was committed, it was tested to ensure the development and implementation was error-free.
In the case any errors were discovered down the line, they would have been identified using the commit history, static inspection and practical testing.
Any existing issues were mentioned in the group chat or Github issues page, then identified in the source code and finally fixed.

An example of how testing was accomplished is the project page. Once the page was developed and implemented, it was physically inspected and then practically tested against the client requirements[^req-08].

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
[^showdown]: <https://showdownjs.com/>
