import prisma from "@/prisma"
import { User } from "@prisma/client"

export default defineEventHandler(event => {
	const query = getQuery(event)
	console.log("uid for tasks:", query.uid)

	return prisma.task.findMany({
		where: {
			assignees: {
				some: { uid: query.uid as User["uid"] },
			},
		},
		include: {
			subtasks: true,
			assignees: true,
			project: true,
		},
	})
})
