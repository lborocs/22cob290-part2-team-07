import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	const post = await prisma.post.findFirst({
		where: {
			topic: {
				is: {
					name: "FAQ",
				},
			},
		},
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
	return post
})
