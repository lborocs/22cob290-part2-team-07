import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const query = getQuery(event)
	console.log("creating task")

	const task = await prisma.task.create({
		data: {
			description: "hard-coded description",
			name: "Task Name (hc)",
			workerHours: 12,
			assignees: {},
			subtasks: {},
			project: {},
		},
	})
	console.log(task)

	return { success: true }
})
