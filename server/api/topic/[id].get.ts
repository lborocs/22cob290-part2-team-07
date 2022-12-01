export default defineEventHandler(async event => {
	return (await $fetch("/api/topics")).find(
		topic => topic.uid == event.context.params.id,
	)
})
