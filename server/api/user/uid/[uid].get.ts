import prisma from "@/prisma"

export default defineCachedEventHandler(
	event => {
		return prisma.user.findUnique({
			where: { uid: event.context.params.uid as string },
			include: {
				roles: true,
			},
		})
	},
	{
		maxAge: 5,
	},
)
