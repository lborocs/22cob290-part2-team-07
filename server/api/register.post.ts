import prisma from "@/prisma"
import { decodeEmail } from "@/types/invite"
import { everyoneUid } from "@/types/permission"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const code = body.code as string
	const email = decodeEmail(code)

	const results = await prisma.$transaction([
		prisma.invite.delete({
			where: { code },
		}),
		prisma.user.create({
			data: {
				email,
				name: body.name as string,
				roles: { connect: { uid: everyoneUid } },
				secure: { create: { password: body.password as string } },
			},
		}),
	])
	return results[1].uid
})
