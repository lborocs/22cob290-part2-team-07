import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const { uid } = (await prisma.user.findUnique({
		where: { email: event.context.params.email as string },
	}))!

	return await prisma.user.findUnique({
		where: { uid },
		include: {
			roles: {
				select: {
					name: true,
					rank: true,
				},
			},
			posts: {
				include: {
					topic: {
						include: {
							overrideRoles: {
								where: {
									role: { users: { some: { uid } } },
								},
							},
							overrideUsers: { where: { userUid: uid } },
						},
					},
					overrideRoles: {
						where: {
							role: { users: { some: { uid } } },
						},
					},
					overrideUsers: { where: { userUid: uid } },
				},
			},
		},
	})
})
