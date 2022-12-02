import { UserRank } from "."

export function profilePicture(name: string, size: number = 50): string {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name,
	)}&background=random&size=${size}&format=svg`
}

export const emailDomain = "@make-it-all.co.uk"

export function rankTitle(rank: UserRank): string {
	switch (rank) {
		case UserRank.Manager:
			return "Manager"
		case UserRank.TeamLeader:
			return "Team Leader"
		case UserRank.Employee:
		default:
			return "Employee"
	}
}
