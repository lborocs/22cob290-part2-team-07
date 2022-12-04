import { TaskStatus } from "~~/types"
import { emailDomain } from "~~/types/user"
import { UserRank } from "~~/types"

export default defineEventHandler(event => {
	return <Task[]>[
		{
			uid: 1,
			name: "Task 1",
			description: "Task 1 description",
			workerHours: 1,
			assignees: [
				{
					uid: 1,
					email: `king${emailDomain}`,
					name: "Neumann",
					rank: UserRank.Manager,
				},
				{
					uid: 2,
					email: `queen${emailDomain}`,
					name: "Queen",
					rank: UserRank.Manager,
				},
				{
					uid: 3,
					email: `dilip${emailDomain}`,
					name: "Dilip Smith",
					rank: UserRank.Manager,
				},
			],
			status: TaskStatus.Todo,
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 2,
			name: "Task 2",
			description: "Task 2 description",
			workerHours: 2,
			assignees: [],
			status: TaskStatus.InProgress,
			deadline: new Date("2022-12-25").getTime(),
			project: {
				uid: 1,
				name: "Project 1",
				description: "Project 1 description",
				tasks: [],
				deadline: new Date("2022-12-25").getTime(),
			},
		},
		{
			uid: 3,
			name: "Task 3 has a really long name",
			description: "Task 3 description",
			workerHours: 3,
			assignees: [],
			status: TaskStatus.Todo,
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 4,
			name: "Task 4",
			description:
				"Lorem ipsum dolor sit amet dolores sit ad takimata dolor et sadipscing justo accusam erat et. Vero gubergren et. Aliquyam tincidunt vero esse sit id amet magna velit est dolor iriure at. Takimata et eum amet elitr stet et ipsum. Ipsum justo sanctus molestie suscipit at diam est amet aliquyam vero ut et liber sadipscing suscipit et dolor. Dolor eum rebum. Dolor lorem nonumy sea et stet. Clita lorem gubergren consequat et wisi labore eos gubergren te ipsum amet. Aliquyam dolor et labore qui sit volutpat aliquam clita. Dolor stet nonumy et ea iusto justo praesent hendrerit elitr eos velit at. Nam labore elitr accumsan amet tation gubergren ipsum duis aliquyam dolores hendrerit. Eirmod eos ad diam dolores ea at. Accusam et duis lorem ut diam. Et sea est. Diam ea sit lorem et sit et tempor eos enim praesent no nonumy gubergren. Dolore stet aliquyam ea. Tempor magna duis ipsum duo sit voluptua rebum ut invidunt sed ipsum voluptua. Et nonummy sed justo labore magna ut rebum suscipit.",
			workerHours: 4,
			assignees: [],
			status: TaskStatus.Done,
			deadline: new Date("2022-12-25").getTime(),
		},
		{
			uid: 5,
			name: "Task 5",
			description: "Task 5 description",
			workerHours: 5,
			assignees: [],
			status: TaskStatus.InProgress,
			deadline: new Date("2022-12-25").getTime(),
		},
	]
})
