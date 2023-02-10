import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const email = body.email as string
	const b64 = Buffer.from(email).toString("base64")

	const reg = await prisma.register.create({
		data: {
			email: b64,
		},
	})
	return reg?.code
})
