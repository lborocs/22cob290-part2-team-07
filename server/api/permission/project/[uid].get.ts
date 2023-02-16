import prisma from "@/prisma"

export default defineEventHandler(event => {
	return prisma.project.findUnique({
		where: { uid: +(event.context.params.uid as string) },
		include: {
			overrideRoles: {
				include: {
					role: {
						include: {
							_count: {
								select: {
									users: true,
								},
							},
						},
					},
				},
			},
			overrideUsers: {
				include: {
					user: {
						include: {
							roles: {
								select: {
									name: true,
									rank: true,
								},
							},
						},
					},
				},
			},
		},
	})
})
