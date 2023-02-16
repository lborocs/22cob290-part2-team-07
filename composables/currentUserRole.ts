import { permissionsUser } from "@/types/permission"

export const useCurrentUserPermissions = () => {
	const { data: currentUser } = useCurrentUser()
	return permissionsUser(unref(currentUser)?.roles)
}
