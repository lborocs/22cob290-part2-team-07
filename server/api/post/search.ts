import prisma from "@/prisma"

export default defineEventHandler(event => {
	const query = getQuery(event)
	console.log(query)

	const topic = {
		uid: +(query.topic as string),
	}

	const title = {
		contains: query.q as string,
	}

	const where: {
		title?: typeof title
		topic?: typeof topic
	} = {}
	if (query.q) where.title = title
	if (query.topic) where.topic = topic

	return prisma.post.findMany({
		where,
		include: {
			owner: true,
			topic: true,
		},
	})
})
