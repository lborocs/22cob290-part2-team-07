import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.project.findMany()
})
