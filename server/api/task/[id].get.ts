import prisma from "~~/prisma"

export default defineEventHandler(async event => {
	return prisma.task.findUnique({
		where: { uid: +(event.context.params!.id as unknown as number) },
		include: {
			subtasks: true,
			assignees: {
				include: {
					roles: {
						select: {
							name: true,
							rank: true,
						},
					},
				},
			},
			project: true,
		},
	})
})
