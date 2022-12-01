export default defineEventHandler(async event => {
	return (await $fetch("/api/topics")).find(
		topic => topic.id == event.context.params.id,
	)
})
