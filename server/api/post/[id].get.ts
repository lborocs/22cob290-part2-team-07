import prisma from "@/prisma"

export default defineEventHandler(async event => {
	return prisma.post.findUnique({
		where: { uid: +(event.context.params.id as string) },
		include: {
			owner: true,
			topic: true,
		},
	})
})
