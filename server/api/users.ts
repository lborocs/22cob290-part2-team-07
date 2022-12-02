import { emailDomain } from "@/types/user"
import { UserRank } from "@/types"

export default defineEventHandler(event => {
	return <User[]>[
		{
			uid: 1,
			email: `king${emailDomain}`,
			name: "Neumann",
			rank: UserRank.Manager,
		},
		{
			uid: 2,
			email: `queen${emailDomain}`,
			name: "Queen",
			rank: UserRank.Manager,
		},
	]
})
