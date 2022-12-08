export default defineEventHandler(async event => {
	const projects: Project[] = [
		{
			uid: 1,
			name: "Project 1",
			description: "Project 1 description",
			deadline: new Date("2022-12-25").getTime(),
			leader: await $fetch("/api/user/1"),
		},
	]
	return projects
})
