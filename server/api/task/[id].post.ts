import prisma from "~~/prisma"
import { Task } from "@prisma/client"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const task = body.task as KanbanTask
	const ids = task.assignees.map(user => {
		return {
			uid: user.uid,
		}
	})
	await prisma.task.update({
		where: { uid: task.uid },
		data: {
			status: task.status,
			assignees: {
				set: [...ids],
			},
		},
	})
	return {
		status: 200,
	}
})
