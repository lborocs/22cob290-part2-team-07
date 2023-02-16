import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.role.findUnique({
		where: { uid: +(event.context.params.uid as string) },
		include: {
			_count: {
				select: {
					users: true,
				},
			},
		},
	})
})
