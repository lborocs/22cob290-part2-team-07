export default defineEventHandler(async event => {
	return (await $fetch("/api/posts")).find(
		post => post.uid == event.context.params.id,
	)
})
