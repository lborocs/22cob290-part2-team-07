import prisma from "~~/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const newStatus = body as number
	await prisma.task.update({
		where: { uid: +(event.context.params.id as number) },
		data: { status: newStatus },
	})
	return {
		status: 200,
	}
})
