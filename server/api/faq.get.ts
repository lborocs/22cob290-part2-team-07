import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const post = await prisma.post.findFirst({
		where: {
			topic: {
				is: {
					name: "FAQ",
				},
			},
		},
		include: {
			topic: true,
			owner: true,
		},
	})
	return post
})
