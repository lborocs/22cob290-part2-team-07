import prisma from "@/prisma"
import { User } from ".prisma/client"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	return await prisma.topic.create({
		data: {
			name: body.name as string,
		},
		include: {
			overrideRoles: {
				where: {
					role: { users: { some: { uid: body.u as User["uid"] } } },
				},
			},
			overrideUsers: { where: { userUid: body.u as User["uid"] } },
		},
	})
})
