import { emailDomain } from "@/types/user"

export default defineEventHandler(async event => {
	return <User[]>[
		{
			uid: 1,
			email: `king${emailDomain}`,
			name: "Neumann",
		},
		{
			uid: 2,
			email: `queen${emailDomain}`,
			name: "Queen",
		},
	]
})
