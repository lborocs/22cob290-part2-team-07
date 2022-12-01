export default defineEventHandler(async event => {
	const posts: Post[] = [
		{
			uid: 1,
			topics: [await $fetch("/api/topic/1")],
			owner: await $fetch("/api/user/1"),
			created: new Date("2022-12-01").getTime(),
			title: "Film WatchList",
			markdown: "A really cool film list in markdown",
		},
		{
			uid: 2,
			topics: [await $fetch("/api/topic/2")],
			owner: await $fetch("/api/user/2"),
			created: new Date("2022-11-15").getTime(),
			title: "A Latin Tutorial",
			markdown: "loreum ipsum",
		},
	]
	return posts
})
