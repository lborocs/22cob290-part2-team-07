import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.project.delete({
		where: { uid: +(event.context.params.id as string) },
	})
})
