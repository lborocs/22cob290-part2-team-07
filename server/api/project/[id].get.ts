import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.project.findUnique({
		where: { uid: +(event.context.params.id as string) },
		include: {
			leader: {
				include: {
					roles: {
						select: {
							name: true,
							rank: true,
						},
					},
				},
			},
			client: true,
			tasks: {
				include: {
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
					subtasks: true,
				},
			},
		},
	})
})
