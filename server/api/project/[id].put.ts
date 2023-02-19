// update project leader property
import prisma from "~~/prisma"
import { User } from ".prisma/client"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const newLeaderId = body as string
	return await prisma.project.update({
		where: { uid: +(event.context.params.id as string) },
		data: { leader: { connect: { uid: newLeaderId } } },
	})
})
