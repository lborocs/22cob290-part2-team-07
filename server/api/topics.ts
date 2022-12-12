import prisma from "@/prisma"

export default defineCachedEventHandler(event => {
	return prisma.topic.findMany({
		orderBy: { name: "asc" },
	})
})
