import prisma from "@/prisma"
import { Task } from "@prisma/client"
import { workerHours } from "~~/types/task"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	console.log("creating task")
	try {
		const body = await readBody(event)

		const details = body.task as KanbanTask

		const deadlineDate = new Date(details.deadline?.toString() || "")

		console.log("project id", details.projectId)
		console.log("type", typeof details.projectId)

		const task = await prisma.task.create({
			data: {
				name: details.name,
				description: details.description,
				workerHours: +details.workerHours,
				deadline: deadlineDate,
				project:
					// if personal task, set to null. Else, connect to project
					details.projectId != -1
						? { connect: { uid: +details.projectId! } }
						: undefined,
				assignees: {
					connect: [...details.assignees],
				},
			},
		})
		console.log("Task created - ", task)

		return { success: true, task: task }
	} catch (e) {
		if (e) {
			console.error(
				"PrismaClientValidationError - probably missing fields for task",
				e,
			)
			return { success: false, error: "Missing fields for task" }
		} else {
			console.error("Error creating task", e)
			return { success: false, error: "Error creating task" }
		}
	}
})
