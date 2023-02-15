import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.role.findMany({
		include: {
			_count: {
				select: {
					users: true,
				},
			},
		},
		orderBy: {
			rank: "asc",
		},
	})
})
