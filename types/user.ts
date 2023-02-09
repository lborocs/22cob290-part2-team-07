export function profilePicture(name: string, size: number = 50): string {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name,
	)}&background=random&size=${size}&format=svg`
}

export const emailDomain = "@make-it-all.co.uk"

export function rolesTitle(roles: RoleName[]): string {
	roles.sort((a, b) => a.rank - b.rank)
	return (roles[0] ?? { name: "User" }).name
}
