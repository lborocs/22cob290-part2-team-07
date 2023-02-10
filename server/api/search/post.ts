import prisma from "@/prisma"
import { User } from ".prisma/client"

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
							role: { users: { some: { uid: query.u as User["uid"] } } },
						},
					},
					overrideUsers: { where: { userUid: query.u as User["uid"] } },
				},
			},
			overrideRoles: {
				where: {
					role: { users: { some: { uid: query.u as User["uid"] } } },
				},
			},
			overrideUsers: { where: { userUid: query.u as User["uid"] } },
		},
	})
})
