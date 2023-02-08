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
asdf

## Prisma and database design

<!-- Talk about Prisma in more detail. How did we use Prisma in our system? What were the benefits provided to our system? Also need to talk about database design. Why is the database designed the way it is? Are there any limitations to the design? How does the database design allow us to meet the requirements?-->
dff

## GUI (Graphical user interface) design

<!-- Talk about the user interface design. Why is it designed in the way that it is (e.g., colour scheme, layout, navigation etc.)? How does it meet the requirements?  -->
stuff


## Changes from prototype

<!-- Talk about feedback given and reasons for implementing these changes. How will they affect the system? Mention that by implementing this feedback, the requirements will be better met.-->
asdf

# System Implementation

## Planning and prioritisation of tasks

Whatever..

## Bespoke vs COTS
<!-- Briefly justify reasoning for bespoke devlopment. Talk in greater depth how requirements can only be met through bespoke development.-->

asdf

## Documentation, debugging and testing
<!-- Breifly talk about the need for doucmentation for maintance and future development. Describe the process of debugging. Go into more detail with the testing section. Can also mention that some bugs may remain due to the time limit/ economic reasons (if it was the real world).-->

asdf