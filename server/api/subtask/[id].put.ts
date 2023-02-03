// update subtask's done property
import prisma from "~~/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const newStatus = body as boolean
	const subtask = await prisma.subtask.update({
		where: { uid: +(event.context.params.id as number) },
		data: { done: newStatus },
	})
	const allSubtasks = await prisma.subtask.findMany({
		where: { parentId: subtask.parentId },
	})
	const allDone = allSubtasks.filter(subtask => subtask.done)

	let newParentStatus: number
	if (allDone.length === allSubtasks.length) {
		newParentStatus = 2
	} else if (allDone.length === 0) {
		newParentStatus = 0
	} else {
		newParentStatus = 1
	}
	const updatedParent = await prisma.task.update({
		where: { uid: subtask.parentId },
		data: { status: newParentStatus },
	})

	return {
		status: 200,
		newParentStatus: updatedParent.status,
	}
})
