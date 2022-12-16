import prisma from "@/prisma"
import { readFile } from "fs"
import path from "path"

if (process.env.CDN_PATH == undefined) console.error("CDN_PATH is not defined!")
const CDN = path.resolve(process.env.CDN_PATH!)

export default defineEventHandler(async event => {
	const asset = await prisma.asset.findUnique({
		where: { uid: event.context.params.id as string },
	})
	event.node.res.setHeader("content-type", asset!.mimeType)
	event.node.res.setHeader(
		"Content-Disposition",
		`inline; filename="${asset!.name}"`,
	)
	const filepath = path.join(CDN, asset!.uid)
	return new Promise<void>(resolve => {
		readFile(filepath, { encoding: "binary" }, (err, data) => {
			event.node.res.end(data, "binary")
			resolve()
		})
	})
})
