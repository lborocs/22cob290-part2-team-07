import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.topic.findUnique({
		where: { uid: +(event.context.params.id as string) },
	})
})
