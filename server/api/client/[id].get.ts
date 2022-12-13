export default defineEventHandler(async event => {
	return (await $fetch("/api/clients")).find(
		client => client.uid == event.context.params.id,
	)
})
