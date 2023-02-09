import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.user.findUnique({
		where: { email: event.context.params.email as string },
		include: {
			roles: {
				select: {
					name: true,
					rank: true,
				},
			},
		},
	})
})
