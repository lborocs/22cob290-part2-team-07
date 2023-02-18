import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.user.findMany({
		include: {
			roles: {
				select: {
					name: true,
					rank: true,
				},
			},
			assigned: {
				where: {
					projectId: { not: null },
				},
				include: {
					subtasks: true,
				},
			},
		},
	})
})
