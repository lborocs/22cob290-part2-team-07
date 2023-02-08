import prisma from "@/prisma"

export default defineEventHandler(event => {
	const query = getQuery(event)

	const topic = {
		uid: +(query.topic as string),
	}

	const title = {
		contains: query.q as string,
	}

	const where: {
		title?: typeof title
		topic?: typeof topic
	} = {}
	if (query.q) where.title = title
	if (query.topic) where.topic = topic

	return prisma.post.findMany({
		where,
		include: {
			owner: true,
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
			overrideUsers: true, // { where: { userUid: query.u as string } },
		},
	})
})
