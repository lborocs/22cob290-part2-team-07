import prisma from "@/prisma"

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const res = await prisma.client.create({
		data: {
			name: body.name as string,
			representative: body.representative as string,
			email: body.email as string,
			address: body.address as string | undefined,
			phone: body.phone as string | undefined,
			website: body.website as string | undefined,
		},
	})
	console.log("Created - " + JSON.stringify(res))

	return { status: 200, client: res }
})
