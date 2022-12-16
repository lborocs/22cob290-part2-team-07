import prisma from "~~/prisma"

export default defineEventHandler(async event => {
	return prisma.subtask.findMany({
		where: { parentId: +(event.context.params.parentid as number) },
	})
})
