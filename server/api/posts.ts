export default defineEventHandler(async event => {
	return <Post[]>[
		{
			uid: 1,
			topics: [await $fetch("/api/topic/1")],
			owner: await $fetch("/api/user/2"),
			title: "The Best Films Ever",
			created: new Date(2022, 12, 1, 12, 37, 43),
			markdown: "Really cool markdown",
		},
	]
})
