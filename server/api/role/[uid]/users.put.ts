import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)

	const connections = (body.users as string[]).map(uid => ({ uid }))
	return await prisma.role.update({
		where: { uid: +(event.context.params.uid as string) },
		data: {
			users: { connect: connections },
		},
	})
})
