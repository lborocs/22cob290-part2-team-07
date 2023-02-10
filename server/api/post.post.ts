import { Topic, User } from ".prisma/client"
import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	return await prisma.post.create({
		data: {
			title: body.title as string,
			markdown: body.markdown as string,
			topic: { connect: { uid: body.topic as Topic["uid"] } },
			owner: { connect: { uid: body.owner as User["uid"] } },
		},
		select: {
			uid: true,
		},
	})
})
