import prisma from "@/prisma"
import { encodeEmail } from "@/types/invite"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const email = body.email as string
	const b64 = encodeEmail(email)

	const reg = await prisma.invite.create({
		data: {
			code: b64,
		},
	})
	return reg?.code
})
