import prisma from "@/prisma"
import { createWriteStream } from "fs"
import busboy from "busboy"
import path from "path"
import { Asset } from ".prisma/client"

if (process.env.CDN_PATH == undefined) console.error("CDN_PATH is not defined!")
const CDN = path.resolve(process.env.CDN_PATH!)

export default defineEventHandler(async event => {
	const assets: Asset[] = []
	const bb = busboy({ headers: getHeaders(event), limits: {} })
	bb.on("file", (name, file, info) => {
		prisma.asset
			.create({
				data: {
					name: name,
					mimeType: info.mimeType,
				},
			})
			.then(asset => {
				file.pipe(createWriteStream(path.join(CDN, asset.uid)))
				assets.push(asset)
			})
	})

	return new Promise(resolve => {
		bb.on("close", () => {
			resolve({
				assets,
			})
		})
		event.node.req.pipe(bb)
	})
})
