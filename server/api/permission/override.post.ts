import * as override from "./_override"
import { Permission } from "@/types/permission"

export default defineEventHandler(async event => {
	const body = await readBody(event)

	const tableName = body.table as string
	const tableUid = +(body.tableUid as string)
	const type = body.type as string
	const typeUid =
		type === "role" ? +(body.roleUid as string) : (body.userUid as string)

	const table = override.typeTable(tableName, type)
	if (table == undefined) return null // TODO: Return error code

	return await table.create({
		data: {
			allow: Permission.NONE,
			deny: Permission.NONE,
			[type]: { connect: { uid: typeUid } },
			[tableName]: { connect: { uid: tableUid } },
		},
	})
})
