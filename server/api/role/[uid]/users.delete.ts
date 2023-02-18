import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)

	return await prisma.role.update({
		where: { uid: +(event.context.params.uid as string) },
		data: {
			users: { disconnect: [{ uid: body.user }] },
		},
	})
})
