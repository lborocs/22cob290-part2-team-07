import prisma from "@/prisma"
import { everyoneUid } from "@/types/permission"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const email = body.email as string
	const b64 = Buffer.from(email).toString("base64")

	const results = await prisma.$transaction([
		prisma.invite.delete({
			where: { code: b64 },
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
