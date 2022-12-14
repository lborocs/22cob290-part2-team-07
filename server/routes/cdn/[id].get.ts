import * as fs from "fs"
import path from "path"

const CDN_DIR = `cdn`
const CDN = path.resolve(CDN_DIR)

export default defineEventHandler(event => {
	const res = event.node.res
	const filepath = path.resolve(CDN, "../assets/tools.svg")
	res.setHeader("content-type", "image/svg+xml")
	res.setHeader("Content-Disposition", 'inline; filename="MyFileName"')
	return new Promise(resolve => {
		fs.readFile(filepath, { encoding: "binary" }, (err, data) => {
			res.end(data, "binary")
		})
	})
})
