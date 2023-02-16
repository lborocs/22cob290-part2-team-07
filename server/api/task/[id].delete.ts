import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const res = await prisma.task.delete({
		where: {
			uid: +(event.context.params?.id as unknown as number),
		},
	})
	console.log("Deleted - " + JSON.stringify(res))

	return { status: 200, task: res }
})
