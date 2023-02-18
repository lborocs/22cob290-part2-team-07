export function profilePicture(name: string, size: number = 50): string {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name,
	)}&background=random&size=${size}&format=svg`
}

export const emailDomain = "@make-it-all.co.uk"

export function rolesHighest(roles: RoleName[]): RoleName {
	roles.sort((a, b) => a.rank - b.rank)
	return roles[0]
}

export function rolesTitle(roles?: RoleName[]): string {
	if (roles == null || roles.length <= 0) return "User"
	return rolesHighest(roles).name
}

export function login(user: UserR) {
	const maxAge = 60 * 60 * 24 * 7
	document.cookie = `uid=${user.uid}; path=/; Max-Age=${maxAge}`
	// for (const storage of [localStorage, sessionStorage]) {
	// 	storage.setItem("user", JSON.stringify(user))
	// }
}

export function logout() {
	document.cookie = `uid=0; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT`
	// for (const storage of [localStorage, sessionStorage]) {
	// 	storage.removeItem("user")
	// }
}
