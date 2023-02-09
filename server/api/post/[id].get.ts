import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	return prisma.post.findUnique({
		where: { uid: +(event.context.params.id as string) },
		include: {
			owner: {
				include: {
					roles: {
						select: {
							name: true,
							rank: true,
						},
					},
				},
			},
			topic: {
				include: {
					overrideRoles: {
						where: {
							role: { users: { some: { uid: query.u as string } } },
						},
					},
					overrideUsers: { where: { userUid: query.u as string } },
				},
			},
			overrideRoles: {
				where: {
					role: { users: { some: { uid: query.u as string } } },
				},
			},
			overrideUsers: { where: { userUid: query.u as string } },
		},
	})
})
