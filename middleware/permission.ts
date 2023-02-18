import {
	has,
	Permission,
	permissions,
	permissionsUser,
} from "@/types/permission"

export function requires(flags: Permission) {
	return async () => {
		const { data: currentUser } = await useCurrentUser()
		const p = permissionsUser(currentUser.value?.roles)
		if (!has(permissions(p), flags))
			return navigateTo("/dashboard", {
				redirectCode: 403,
			})
	}
}
