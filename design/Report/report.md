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

# Introduction

The purpose of this report is to discuss and explain the system design and implementation strategy which have been applied to this system. The system which has been created is a productivity and knowledge management system. The system has been based off set requirements delivered to us via the “specification” letter from the client as well as ever changing requirements and clarifications discussed with the client via the online forums. The scope of this project is set within these requirements which were outlined in our requirements document.

To create the system, we were aided by many different tools. GitHub provided the distributed version control of git, which allowed each of us to write code on our different machines. GitHub also provided us with a method of tracking jobs which needed to be done. This way, we could track the progression of the software and allocate/distribute everyone’s time fairly. We used Vue.js as a JavaScript framework to help us build the system. Vue.js gave us a multiplex of tools which could be used to build the front-end and make it interactive. We also used Nuxt which is a higher-level framework which builds on top of vue. Nuxt takes complexity away from development as it handles client-side and server-side processing. Therefore, as developers, we could focus on the actual programming. MySQL was also used as a database management system. The database stored information about the productivity and knowledge management system (e.g., tasks, account details etc). On top of MySQL, we used Prisma to help make development faster and more intuitive – through auto-completions and easy-to-read data models.

# System Design

## Nuxt/Vue and component selection

<!-- More detail about the inner workings of next and vue and how they have both been used in this particular system. Also need to talk about the different Vue components, justifying why the system has been split into the current components.-->

The project was developed with a Vue js framework for building user interfaces. Vue is a component-based architecture allowing for reusable components that are reactive and dynamic. It uses a reactive data-binding system, which allows for automatic updates whenever the underlying data changes, making it easier to manage complex, dynamic applications. This was particularly useful for this project as it started out as a small-scale prototype application with little use for data handling and performance optimization and progressed into a full-stack application,where management and manipulation of data was vital. We created various components that were independent or relient on other components in order to create blocks of functionality on each page of the system. Vue allowed for greater reusibility of code/components as, for example, each block of functonality was placed on a project card component where the absence of Vue would have forced the duplication of code. The project page, for example, is an amalgamation of a project card component, a progress spinner component,and a user icon component among others used to create the finalised page. Structuring the system in this way allowed for a much faster system for many reasons. Vue js uses a virtual DOM to update and render components efficiently, making it faster than direct DOM manipulation and also allowing for lazy-loading where components are only loaded when needed, thus reducing initial load times. Not only did this benefit performance but also allowed us as a development team to work on components/pages independently and produce functionality much faster whilst being able to swap out and implement components where necessary.

## Prisma and database design

<!-- Talk about Prisma in more detail. How did we use Prisma in our system? What were the benefits provided to our system? Also need to talk about database design. Why is the database designed the way it is? Are there any limitations to the design? How does the database design allow us to meet the requirements? A graphic for the database design might be nice.-->

dff

## GUI (Graphical user interface) design

<!-- Talk about the user interface design. Why is it designed in the way that it is (e.g., colour scheme, layout, navigation etc.)? How does it meet the requirements?  -->

The GUI (graphical user interface) was designed to meet the clients at Make-It-All requirements. In this light, the system follows a yellow, grey and black colour scheme. Furthermore, many interface design decisions have been made after conversations on the online forums. For example, the Kanban style of displaying tasks was a requirement set out by the client which influenced the way that the UI (user interface) was designed. The UI incorporates modern HCI (Human Computer Interaction) and is designed with usability in mind.

Here are the guiding principles which were kept in consideration when completing the design of the system:

- A colour scheme which is easy to read (a strong contrast in colour between the background colour and the text, a font which is readable and colours which are still readable for people with colour blindness). This helps make the system easier and faster to use.
- A simple UI which isn’t overcrowded and is simple to follow. This helps the usability of the system as it means that no negative functionality is provided to the user (negative functionality is functionality which takes away from the user experience – putting the system further away from the user’s needs). The importance of a simple UI is reiterated by the requirements from the client (through the online forums).
- Careful attention paid to the default options which the UI incorporates (e.g., defaulting the knowledge management search function to search for all topics). By using common default options, the system can become more efficient and save the user time.
- A consistent design throughout the whole system. Consistency in design helps the user feel more familiar with the system and makes the software more intuitive to new users.

## Changes from prototype

<!-- Talk about feedback given and reasons for implementing these changes. How will they affect the system? Mention that by implementing this feedback, the requirements will be better met.-->

During our presentation to the clients, we received feedback on how our prototype could be improved to better meet the requirements. In order to make a better system for the client, we have implemented the majority of their feedback. See table 1 for details.

(Table 1)
| System page | Feedback | Implemented (Yes/No) |
| ----------------- | ------------ | ------------------------------- |
| Dashboard | Needs to be clear where each task has originated from | XXX |
| Dashboard | Team leaders and managers should be part of one or more teams | XXX |
| Dashboard | Could have functionality to swap between Kanban view and task view | XXX |
| Project | Calculation of progress should be based on worker-hours of tasks | XXX |
| Project | The days remaining until the project deadline should exclude holidays and weekends | XXX |
| Project | Should be able to change the team leader of a project | XXX |
| Project | Could make use of graphs (e.g., bar chart) to show the allocation of hours, amongst employees, on a project | XXX |
| Project | Each task in the tasks section of the page could have an icon(s) to see who is allocated the task | XXX |
| Project | Could have functionality to show more information about an employee when their icon is hovered over| XXX |
| Knowledge management | FAQ page is needed | XXX |
| Knowledge management | Managers should be able to decide on a person-to-person basis; who can create topics, who can create posts within a topic and who can comment on the FAQ | XXX |
| Knowledge management | Functionality to upload images to posts is needed | XXX |
| Knowledge management | Could search for posts by user | XXX |
| Not page specific | Shouldn’t highlight the navigation button to “view my profile” page when you are viewing someone else’s page| XXX |
| Not page specific | The navigation bar could show text on hover | XXX |

# System Implementation

## Planning and prioritisation of tasks

<!-- Talk about Github Kanban board (potentially add a screenshot of it?). How did it make us more productive? How did it help us prioritise our work?-->

To implement the system, we first had to use reductionism to break the design down into much smaller tasks. We then needed a method to keep track of the implementation of these tasks. If only we could find a good piece of productivity management software!

Jokes aside, in order to implement the system in the most efficient manner, we used a Kanban board of our own on GitHub. Therefore, we could plan the order of the tasks which would be completed and the priority of each task. The Kanban board also allowed us to assign each task to a team member and track the progression of each task. This form of productivity management allowed us to build the software in a systematic manner and ensured that we didn’t forget any tasks. Finally, and most importantly, the Kanban board allowed us to focus on the continuous delivery of the system.

## Bespoke vs COTS

<!-- Briefly justify reasoning for bespoke devlopment. Talk in greater depth how requirements can only be met through bespoke development.-->

Bespoke development is where software is developed completely from scratch and aims to meet the requirements of the users who the software is being developed for. COTS (commercial off the shelf) development, on the other hand, is where software is generic and aims to meet the requirements of a large group of different users. For this project, we have used a bespoke development strategy. Although COTS is far less expensive, it doesn’t allow for custom functionality/requirements. In this case, the client has many unique requirements which couldn’t be implemented using COTS software.

The bespoke development process is developed by first gathering requirements. Next the software must be designed and the implemented. Penultimately, the software must be validated. This is the process whereby the developers ensure that the software meets the needs of the stakeholders. Finally, the software goes into the evolution stage of the software process. This is where the software is updated as the world changes. We have not made it to the evolution stage yet.

Throughout our bespoke development process, we’ve used the throw-away prototype development methodology. The throwaway prototype model was used to meet the needs of the client. The client wanted a static deliverable half way through development of the system. The throw-away prototype model is by far the best way to give the client a deliverable which had a very similar design to the end system. The only changes made to the design and functionality of the system are based on feedback of the prototype from the client. This has the disadvantage that the client cannot actually begin to use the prototype as it is static (hard-coded with no real database). However, in this case, this was not an issue for the client. After the client had seen the prototype and given feedback, the prototype was thrown away. Development of the final system was then started with the feedback of the client to aid the final systems design and functionality.
## Documentation, debugging and testing

<!-- Breifly talk about the need for documentation for maintance and future development. Describe the process of debugging. Go into more detail with the testing section. Can also mention that some bugs may remain due to the time limit/ economic reasons (if it was the real world). How did these tools allow us to meet the requirements? Talk about lighthouse (link with GUI section - testing usability)?-->

asdf
