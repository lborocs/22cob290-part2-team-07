import prisma from "@/prisma"

export default defineEventHandler(event => {
	const query = getQuery(event)	
	const uuid = query.u as User["uid"] | undefined
	return prisma.project.findMany({
		include: {
			overrideRoles: {
				where: {
					role: { users: { some: { uid: uuid } } },
				},
			},
			overrideUsers: { where: { userUid: uuid } },
		},
	})
})
