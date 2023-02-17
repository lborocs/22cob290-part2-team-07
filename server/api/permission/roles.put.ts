import { Role } from ".prisma/client"
import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const roles = body.roles as Role["uid"][]

	const commands = roles.map((role, index) =>
		prisma.role.update({
			where: {
				uid: +role,
			},
			data: {
				rank: index + 1,
			},
			include: {
				_count: {
					select: {
						users: true,
					},
				},
			},
		}),
	)
	return await prisma.$transaction(commands)
})
