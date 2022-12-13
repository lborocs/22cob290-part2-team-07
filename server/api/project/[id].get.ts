import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.project.findUnique({
		where: { uid: +(event.context.params.id as string) },
		include: {
			leader: true,
			client: true,
			tasks: {
				include: {
					assignees: true,
					subtasks: true,
				},
			},
		},
	})
})
