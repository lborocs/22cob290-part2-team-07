import prisma from "@/prisma"
import { User } from "@prisma/client"

export default defineEventHandler(event => {
	const query = getQuery(event)

	// if the query is for all tasks, then don't filter by assignee (where is undefined)
	const whereClause =
		query.getAll == "true"
			? undefined
			: {
					assignees: {
						some: { uid: query.uid as User["uid"] },
					},
			  }

	return prisma.task.findMany({
		where: whereClause,
		include: {
			subtasks: true,
			assignees: true,
			project: true,
		},
	})
})
