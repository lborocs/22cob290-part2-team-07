import prisma from "@/prisma"
import { everyoneUid } from "@/types/permission"

export default defineEventHandler(async event => {
	const body = await readBody(event)

	await prisma.$transaction(async tx => {
		const gone = await tx.role.delete({
			where: {
				uid: +(body.uid as string),
			},
		})
		const roles = await tx.role.findMany({
			where: {
				rank: { gte: gone.rank },
				uid: { not: everyoneUid },
			},
			select: {
				uid: true,
			},
			orderBy: {
				rank: "asc",
			},
		})
		const commands = roles.map((role, index) =>
			tx.role.update({
				where: {
					uid: role.uid,
				},
				data: {
					rank: gone.rank + index,
				},
			}),
		)
		await Promise.all(commands)
	})
	return true
})
