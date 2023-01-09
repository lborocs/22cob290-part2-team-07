import prisma from "@/prisma"

export default defineEventHandler(event => {
	const query = getQuery(event)

	const name = {
		contains: query.q as string,
	}

	const where: {
		name?: typeof name
	} = {}
	if (query.q) where.name = name

	return prisma.asset.findMany({
		where,
	})
})
