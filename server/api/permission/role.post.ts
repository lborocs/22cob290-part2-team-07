import prisma from "@/prisma"
import { Permission } from "~~/types/permission"

export default defineEventHandler(async event => {
	const body = await readBody(event)

	return await prisma.$transaction(async tx => {
		const size = await tx.role.count()
		return await tx.role.create({
			data: {
				allow: Permission.NONE,
				deny: Permission.NONE,
				name: body.name as string,
				rank: size - 1,
			},
		})
	})
})
