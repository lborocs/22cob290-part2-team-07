import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const user = await prisma.user.findUnique({
		where: { email: body.email as string },
		include: { secure: true },
	})

	if (user === null) return null
	if (user.secure!.password !== (body.password as string)) return null
	return await prisma.user.findUnique({
		where: { uid: user!.uid },
		include: {
			roles: true,
		},
	})
})
