// update subtask's done property
import prisma from "~~/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const newStatus = body as boolean
	await prisma.subtask.update({
		where: { uid: +(event.context.params.id as number) },
		data: { done: newStatus },
	})
	return {
		status: 200,
	}
})
