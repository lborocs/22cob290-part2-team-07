import prisma from "@/prisma"

export default defineEventHandler(async event => {
	return await prisma.client.findUnique({
		where: {
			uid: +(event.context.params.id as string),
		},
		include: {
			projects: true,
		},
	})
})
