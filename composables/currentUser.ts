// Subject to change
export const useCurrentUser = () =>
	useAsyncData<User>("currentUser", async () => {
		// TODO: Use local storage or cookies to find the correct user ID
		return await $fetch("/api/user/2")
	}).data
