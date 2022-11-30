export function profilePicture(user: User): string {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		user.name,
	)}&background=random&size=50&format=svg`
}

export const emailDomain = "@make-it-all.co.uk"
