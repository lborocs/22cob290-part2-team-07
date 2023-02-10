import prisma from "@/prisma"
import { Task } from "@prisma/client"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"
import { workerHours } from "~~/types/task"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	console.log("creating task")
	try {
		const body = await readBody(event)

		const details = body.task as Task
		console.table(details)
		console.log(typeof details.workerHours, typeof +details.workerHours)

		const task = await prisma.task.create({
			data: {
				name: details.name,
				description: details.description,
				workerHours: +details.workerHours,
			},
		})
		console.log("Task created - ", task)

		return { success: true, task: task }
	} catch (e) {
		if (e instanceof PrismaClientValidationError) {
			console.error(
				"PrismaClientValidationError - probably missing fields for task",
				e,
			)
			return { success: false, error: "Missing fields for task" }
		}
	}
})
