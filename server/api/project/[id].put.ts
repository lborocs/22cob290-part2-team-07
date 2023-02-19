// update project leader property
import prisma from "~~/prisma"
import { User } from ".prisma/client"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const newLeader = body as UserRR
	return await prisma.project.update({
		where: { uid: +(event.context.params.id as string) },
		data: { leaderId: newLeader!.uid },
	})
})
