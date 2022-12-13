import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.task.findMany({
		include: {
			subtasks: true,
			assignees: true,
			project: true,
		},
	})
})
