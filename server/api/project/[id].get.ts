export default defineEventHandler(async event => {
	return (await $fetch("/api/projects")).find(
		project => project.uid == event.context.params.id,
	)
})
