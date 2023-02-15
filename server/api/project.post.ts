import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const res = await prisma.project.create({
		data: {
			name: body.name as string,
			description: body.description as string,
			leader: { connect: { email: body.leader as string } },
			deadline: new Date(body.deadline.toString() || ""),
			client: { connect: { uid: body.client as number } },
		},
		select: {
			uid: true,
		},
	})
	console.log("Created - " + res)
	return res
})
