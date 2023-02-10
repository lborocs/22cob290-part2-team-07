import { Role, User } from ".prisma/client"

// Subject to change
export const useCurrentUser = () =>
	useAsyncData<User & { roles: Role[] }>("currentUser", async () => {
		// TODO: Use local storage or cookies to find the correct user ID
		return await $fetch("/api/login", {
			method: "POST",
			body: {
				email: "queen",
				password: "pqueen",
			},
		})
	}).data
