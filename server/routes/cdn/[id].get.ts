import prisma from "@/prisma"
import { readFile } from "fs"
import path from "path"

if (process.env.CDN_PATH == undefined) console.error("CDN_PATH is not defined!")
const CDN = path.resolve(process.env.CDN_PATH!)
const CACHE_AGE = 60 * 60 * 24 // 1 Day in Seconds

const CACHE_HEADER = `max-age=${CACHE_AGE}, immutable`

export default defineEventHandler(async event => {
	const asset = await prisma.asset.findUnique({
		where: { uid: event.context.params.id as string },
	})
	event.node.res.setHeader("Content-Type", asset!.mimeType)
	event.node.res.setHeader(
		"Content-Disposition",
		`inline; filename="${asset!.name}"`,
	)
	event.node.res.setHeader("Cache-Control", CACHE_HEADER)
	event.node.res.setHeader("Connection", "keep-alive")
	event.node.res.setHeader("Keep-Alive", "timeout=5, max=30")
	const filepath = path.join(CDN, asset!.uid)
	return new Promise<void>(resolve => {
		readFile(filepath, { encoding: "binary" }, (err, data) => {
			event.node.res.end(data, "binary")
			resolve()
		})
	})
})
