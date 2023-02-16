import prisma from "@/prisma"

export default defineEventHandler(async event => {
	return await prisma.client.findMany()
})
