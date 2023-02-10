import { Topic, User } from ".prisma/client"
import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	return await prisma.post.update({
		where: {
			uid: +(event.context.params.id as string),
		},
		data: {
			markdown: body.markdown as string,
		},
	})
})
