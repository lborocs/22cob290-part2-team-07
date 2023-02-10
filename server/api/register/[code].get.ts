import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const reg = await prisma.register.findUnique({
		where: { code: event.context.params.code as string },
	})
	if (reg === null) return null
	return Buffer.from(reg.code, "base64").toString()
})
