import { Role, User } from ".prisma/client"
import { login } from "~~/types/user"

// Subject to change
export const useCurrentUser = () =>
	useAsyncData<(User & { roles: Role[] }) | null>("currentUser", async ctx => {
		const uid = useCookie("uid").value
		return await $fetch(`/api/user/uid/${uid}`)
	})
