import prisma from "~~/prisma"

export default defineEventHandler(async event => {
	return prisma.task.findUnique({
		where: { uid: +(event.context.params.id as number) },
		include: {
			subtasks: true,
			assignees: true,
			project: true,
		},
	})
})
