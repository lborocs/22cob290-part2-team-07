import prisma from "@/prisma"
import { User } from ".prisma/client"

export default defineCachedEventHandler(
	event => {
		const query = getQuery(event)

		return prisma.topic.findMany({
			orderBy: { name: "asc" },
			include: {
				overrideRoles: {
					where: {
						role: { users: { some: { uid: query.u as User["uid"] } } },
					},
				},
				overrideUsers: { where: { userUid: query.u as User["uid"] } },
			},
		})
	},
	{ maxAge: 15 },
)
