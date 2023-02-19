import prisma from "@/prisma"

export default defineEventHandler(event => {
	const query = getQuery(event)

	let whereClause = undefined

	if (query.minimumRank != undefined) {
		const minimumRank: number = parseInt(query.minimumRank as unknown as string)

		whereClause = {
			roles: {
				every: { rank: { gte: minimumRank } },
			},
		}
	}

	return prisma.user.findMany({
		where: whereClause,
		include: {
			roles: {
				select: {
					name: true,
					rank: true,
				},
			},
		},
	})
})
