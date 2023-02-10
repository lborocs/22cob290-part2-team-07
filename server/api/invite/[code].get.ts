import prisma from "@/prisma"
import { decodeEmail } from "@/types/invite"

export default defineEventHandler(async event => {
	const reg = await prisma.invite.findUnique({
		where: { code: event.context.params.code as string },
	})
	if (reg === null) return null
	return decodeEmail(reg.code)
})
