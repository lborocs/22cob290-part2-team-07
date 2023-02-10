import prisma from "@/prisma"

export default defineCachedEventHandler(
	event => {
		const query = getQuery(event)

		return prisma.topic.findMany({
			orderBy: { name: "asc" },
			include: {
				overrideRoles: {
					where: {
						role: { users: { some: { uid: query.u as string } } },
					},
				},
				overrideUsers: { where: { userUid: query.u as string } },
			},
		})
	},
	{ maxAge: 15 },
)
