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
documentclass: extreport
fontsize: 11pt
geometry: margin=2cm
---

<!--



To compile: pandoc report.md -o report.pdf

https://pandoc.org/installing.html

winget or apt or whatever also have it iirc

-->

<!--Todo
~~weekly meetings~~
~~WhatsApp communcation usage~~
comments
github projects and issues
link everthing to requirements where appropriate
expand the implementation as its 70% of the report marks
-->

# Introduction

The purpose of this report is to discuss and explain the system design and implementation strategy which have been applied to this system. The system which has been created is a productivity and knowledge management system. The system has been based off set requirements delivered to us via the “specification” letter from the client, as well as ever-changing requirements and clarifications discussed with the client via the online forums. The scope of this project is set within these requirements which were outlined in our requirements document.

To create the system, we were aided by many different tools. GitHub provided the distributed version control of git, which allowed each of us to write code on our different machines. GitHub also provided us with a method of tracking jobs which needed to be done. This way, we could track the progression of the software and allocate/distribute everyone’s time fairly.

We used Vue.js, a JavaScript framework, to help us build the system. Vue.js gave us a multiplex of tools which could be used to build the front-end and make it interactive. We also used Nuxt, which is a higher-level framework which builds on top of vue. Nuxt takes complexity away from development as it handles client-side and server-side processing. Therefore, as developers, we could focus on the actual programming.

MySQL was also used as a database management system. The database stores information about the productivity and knowledge management system (e.g., tasks, account details etc). On top of MySQL, we used Prisma to help make development faster and more intuitive – through auto-completions and easy-to-read data models.

# System Design

## Nuxt/Vue and component selection

<!-- More detail about the inner workings of next and vue and how they have both been used in this particular system. Also need to talk about the different Vue components, justifying why the system has been split into the current components.-->

The project was developed with a Vue js framework for building user interfaces. Vue is a component-based architecture allowing for reusable components that are reactive and dynamic. It uses a reactive data-binding system, which allows for automatic updates whenever the underlying data changes, making it easier to manage complex, dynamic applications.

This was particularly useful for this project as it started out as a small-scale prototype application with little use for data handling and performance optimization and progressed into a full-stack application, where management and manipulation of data was vital. We created various components that were independent or reliant on other components in order to create blocks of functionality on each page of the system. Vue allowed for greater reusibility of code/components as, for example, each block of functionality was placed on a project card component where the absence of Vue would have forced the duplication of code. The project page, for example, is an amalgamation of a project card component, a progress spinner component, and a user icon component, among others used to create the finalised page. Structuring the system in this way allowed for a much faster system for many reasons.

Vue js uses a virtual DOM to update and render components efficiently, making it faster than direct DOM manipulation and also allowing for lazy-loading where components are only loaded when needed, thus reducing initial load times. Not only did this benefit performance but also allowed us as a development team to work on components/pages independently and produce functionality much faster whilst being able to swap out and implement components where necessary.

Nuxt.js is a server-side rendering framework built on Vue.js and this framework was used in this project for many reasons. It provided automatic rendering of components on the server-side which helped to improve the performance of the system. Nuxt also provided a powerful and flexible routing system allowing for the organisation of components and pages.

Initially, the biggest help provided by Nuxt in our project was the provision of a structured filing system which split up the system's pages, components and assets, among other things, which allowed us as a development team to find and manage the code much more efficiently. Additionally, Nuxt came with a set of pre-configured build tools such as CSS pre-processors which we used in our project to implement SASS, making it easier to write and maintain styles for the application.

All these libraries assisted in meeting the requirements in many different aspects. We were able to easily produce a responsive design (requirements.md 13.1) and make elements reactive to provide up to date and accurate information ,for example the kanban board (requirements.md 6.3)<!-- could link these? if its possible-->, just to name a few of the requirements hit due to these libraries.

## Prisma and database design

<!-- Talk about Prisma in more detail. How did we use Prisma in our system? What were the benefits provided to our system? Also need to talk about database design. Why is the database designed the way it is? Are there any limitations to the design? How does the database design allow us to meet the requirements? A graphic for the database design might be nice.-->

As per the specification, a MySQL database has been used to store and interact with data needed for usage of the system. We decided to streamline this by using Prisma, an ORM (Object Relational Mapper) to manage and interact with the database.

First off, we needed to create a database design. This was done in a team meeting where we outlined the tables needed, primary keys for each and then any additional tables that were needed to follow data normalisation. During this meeting we produced schema.md, a markdown file which contains the plan for the database. This was mostly followed in the final production of the database, with the addition of other tables which we needed to implement the design. <!-- link to schema.md-->

Now that the initial draft of the database design was complete, we needed to produce the tables and implement data. Prisma offers a Schema Definition Lanugage (SDL) which is a high level language which defines a simple way to specify the type of database (in this case MySQL) and the tables it includes. Use of this table provides a clear view of the tables, and the opportunity to use Prisma Studio, a GUI for the database. This document is schema.prisma <!--link to schema.prisma-->, which defines all the tables, their contents and data types and additional fields, for example the user id must be unique.

The use of prisma also integrated well with the use of TypeScript, as it allowed for database queries to be written out in TypeScript compared to SQL, which removes the risk of SQL injection attacks on the website. In addition, TypeScript allowed us to write queries much more efficiently, which assisted in the development and testing of the system.

Testing was also a task that prisma aided. Normally to test the website and the database calls, we would need to run the VM (Virtual Machine) on the GCP (Google Cloud Platform). This is time consuming and every change we do requires the server to be updated accordingly. Prisma allowed us to generate a small client database which meant we were able to test database calls within our own computers. Efficiency was greatly improved due to this feature as we were able to design, build and test all in one go, without unnecessary time spent uploading the changes to the VM.

See the image below for the database design:

<!--can include and image of the database design from the initial draft, not sure where it is however-->

## GUI (Graphical user interface) design

<!-- Talk about the user interface design. Why is it designed in the way that it is (e.g., colour scheme, layout, navigation etc.)? How does it meet the requirements?  -->

The GUI (graphical user interface) was designed to meet the clients at Make-It-All requirements. In this light, the system follows a yellow, grey and black colour scheme. Furthermore, many interface design decisions have been made after conversations on the online forums. For example, the Kanban style of displaying tasks was a requirement set out by the client which influenced the way that the UI (user interface) was designed. The UI incorporates modern HCI (Human Computer Interaction) and is designed with usability in mind.

Here are the guiding principles which were kept in consideration when completing the design of the system:

- A colour scheme which is easy to read (a strong contrast in colour between the background colour and the text, a font which is readable and colours which are still readable for people with colour blindness). This helps make the system easier and faster to use.
- A simple UI which isn’t overcrowded and is easy to follow. This helps the usability of the system as it means that no negative functionality is provided to the user (negative functionality is functionality which takes away from the user experience – putting the system further away from the user’s needs). The importance of a simple UI is reiterated by the requirements from the client (through the online forums).
- Careful attention paid to the default options which the UI incorporates (e.g., defaulting the knowledge management search function to search for all topics). By using common default options, the system can become more efficient and save the user time.
- A consistent design throughout the whole system. Consistency in design helps the user feel more familiar with the system and makes the software more intuitive to new users.

## Changes from prototype

<!-- Talk about feedback given and reasons for implementing these changes. How will they affect the system? Mention that by implementing this feedback, the requirements will be better met.-->

During our presentation to the clients, we received feedback on how our prototype could be improved to better meet the requirements. In order to make a better system for the client, we have implemented the majority of their feedback. See table 1 for details.

(Table 1)

| System page          | Feedback                                                                                                                     | Implemented (Yes/No) |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Dashboard            | Needs to be clear where each task has originated from                                                                        | Yes                  |
| Dashboard            | Team leaders and managers should be part of one or more teams                                                                | Yes                  |
| Dashboard            | Could have functionality to swap between Kanban view and task view                                                           | Yes                  |
| Project              | Calculation of progress should be based on worker-hours of tasks                                                             | Yes                  |
| Project              | The days remaining until the project deadline should exclude holidays and weekends                                           | Yes (Partially)      |
| Project              | Should be able to change the team leader of a project                                                                        | XXX                  |
| Project              | Could make use of graphs (e.g., bar chart) to show the allocation of hours, amongst employees, on a project                  | Yes                  |
| Project              | Each task in the tasks section of the page could have an icon(s) to see who is allocated the task                            | Yes                  |
| Project              | Could have functionality to show more information about an employee when their icon is hovered over                          | Yes                  |
| Knowledge management | FAQ page is needed                                                                                                           | Yes                  |
| Knowledge management | Managers should be able to decide on a person-to-person basis; who can create topics and who can create posts within a topic | Yes                  |
| Knowledge management | Functionality to upload images to posts is needed                                                                            | Yes                  |
| Knowledge management | Could search for posts by user                                                                                               | XXX                  |
| Not page specific    | Shouldn’t highlight the navigation button to “view my profile” page when you are viewing someone else’s page                 | Yes                  |
| Not page specific    | The navigation bar could show text on hover                                                                                  | Yes                  |

# System Implementation

## Planning and prioritisation of tasks

<!-- Talk about Github Kanban board (potentially add a screenshot of it?). How did it make us more productive? How did it help us prioritise our work?-->

To implement the system, we first had to use reductionism to break the design down into much smaller tasks. We then needed a method to keep track of the implementation of these tasks. If only we could find a good piece of productivity management software!

Jokes aside, in order to implement the system in the most efficient manner, we used a Kanban board of our own on GitHub. Therefore, we could plan the order of the tasks which would be completed and the priority of each task. The Kanban board also allowed us to assign each task to a team member and track the progression of each task. This form of productivity management allowed us to build the software in a systematic manner and ensured that we didn’t forget any tasks. Finally, and most importantly, the Kanban board allowed us to focus on the continuous delivery of the system.

On top of the Github usage, we held weekly meetings to discuss progress, and address issues that had come up throught the weeks development. These meetings also included the intitial discussions of what libraries we were going to use including the use of TypeScript and SASS, database design and other decisions we needed to make before development. Group tasks were also undertaken for example, the GCP, as well as the task allocation for the next week.

In addition to the meetings, we created a WhatsApp group chat for quick communication. This proved to be very useful, as we were able to discuss issues and ask for any help where needed. Efficiency was the key takeaway from this group chat, as minor issues could be solved without the need for a meeting which meant the weekly meetings were kept on topic and not spent discussing small bugs and errors.

## Bespoke vs COTS

<!-- we were requested to develop the software so im not sure we even need to talk about bespoke as they are asking for bespoke software. Still kept the last paragraph as it discuesses the use of a throwaway prototype-->

<!-- Briefly justify reasoning for bespoke devlopment. Talk in greater depth how requirements can only be met through bespoke development.-->

<!--
Bespoke development is where software is developed completely from scratch and aims to meet the requirements of the users whom the software is being developed for. COTS (commercial-off-the- shelf) development, on the other hand, is where software is generic and aims to meet the requirements of a large group of different users. For this project, we have used a bespoke development strategy. Although COTS is far less expensive, it doesn’t allow for custom functionality/requirements. In this case, the client has many unique requirements which couldn’t be implemented using COTS software.

The bespoke development process is developed by first gathering requirements. Next, the software must be designed and implemented. Penultimately, the software must be validated. This is the process whereby the developers ensure that the software meets the needs of the stakeholders. Finally, the software goes into the evolution stage of the software process. This is where the software is updated as the world changes. We have not made it to the evolution stage yet.
-->

Throughout our bespoke development process, we’ve used the throw-away prototype development methodology. The throwaway prototype model was used to meet the needs of the client. The client wanted a static deliverable half way through development of the system. The throw-away prototype model is by far the best way to give the client a deliverable which had a very similar design to the end system.

The only changes made to the design and functionality of the system were based on feedback of the prototype from the client. This has the disadvantage that the client cannot actually begin to use the prototype as it is static (hard-coded with no real database). However, in this case, this was not an issue for the client. After the client had seen the prototype and given feedback, the prototype was thrown away. Development of the final system was then started with the feedback of the client to aid the final systems design and functionality.

## Documentation

<!-- Breifly talk about the need for documentation for maintance and future development. Describe the process of debugging. Go into more detail with the testing section. Can also mention that some bugs may remain due to the time limit/ economic reasons (if it was the real world). How did these tools allow us to meet the requirements? Talk about lighthouse (link with GUI section - testing usability)?-->

Documentation is extremely important. Effective documentation of the code will make the system easier to maintain and update as it makes the code human-readable. It allows other developers, in the future, to read and understand the current code, which allows them to fix bugs and add more functionality. Even if the developers employed to maintain/update the code in the future are the same developers who wrote the code, they may have forgotten how the code works. Therefore, good documentation is always important.

The client has given multiple indications throughout communications that they will likely wish to add more functionality to the system further down the line. This would only prove feasible if the code has been documented well.

<!--might write something about comments here as documentation-->

Documentation has also been used for the project as a whole. Throughout the project, we have ensured to document the requirements precisely. Our requirements document gave us a clear focus for our development – with “must”, “should” and “could” requirements allowing us to rank the importance of each requirement. We also documented the whole project through GitHub. GitHub gave us version control for our system’s development. Each change which was made to the project was pushed to the repository as a commit. Each commit had a commit message, making it easy to go back and see where each individual change was made.

## Debugging

The version control mentioned above made debugging much simpler. Anytime a bug was found with a particular component, the commit history could be used to see the recent changes made to said component. Usually, the bug lay within one of the recent commits. Debugging is a useful tool which we utilised thoroughly throughout the development of our system. It’s important to note that some bugs will always remain. There comes a point in any project where it is no longer feasible nor cost effective to keep finding and fixing bugs.

## Testing

<!--is this needed? As we have not done any documented testing-->

Throughout the implementation of the system, testing was used to ensure that the requirements of the client had been satisfied. Our throw-away prototype helped us to test the software. By presenting a prototype to the client, the client could find errors in the software which we (as developers) perhaps hadn’t noticed. Throughout development, we adopted a static software inspection approach to testing. A static software inspection is essentially where developers look at code and try to find bugs in it. This was extremely beneficial to the project as it allowed us to implement testing at all stages of the development/design and added very little time/monetary cost. By using static software inspection, we avoided many bugs which ultimately saved us (and the client) time. These approaches to testing helped us meet the client’s requirements as best as possible.
