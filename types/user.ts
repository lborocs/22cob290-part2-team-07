export function profilePicture(name: string): string {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name,
	)}&background=random&size=50&format=svg`
}

export const emailDomain = "@make-it-all.co.uk"
