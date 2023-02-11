import prisma from "@/prisma"
import { Subtask } from "@prisma/client"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	const body = await readBody(event)
	const subtask = body.subtask as Subtask

	try {
		const newSubtask = await prisma.subtask.create({
			data: {
				name: subtask.name,
				workerHours: subtask.workerHours,
				parent: { connect: { uid: subtask.parentId } },
			},
		})
		return {
			status: 200,
			subtask: newSubtask,
		}
	} catch (e) {
		console.log(e)

		return {
			status: 400,
			details: e,
		}
	}
})
