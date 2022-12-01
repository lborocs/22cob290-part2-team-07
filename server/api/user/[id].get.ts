export default defineEventHandler(async event => {
	return (await $fetch("/api/users")).find(
		user => user.uid == event.context.params.id,
	)
})
