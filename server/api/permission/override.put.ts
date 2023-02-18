import * as override from "./_override"

export default defineEventHandler(async event => {
	const body = await readBody(event)

	const tableName = body.table as string
	const tableUid = +(body.tableUid as string)
	const type = body.type as string
	const typeUid =
		type === "role" ? +(body.roleUid as string) : (body.userUid as string)

	const table = override.typeTable(tableName, type)
	if (table == undefined) return null // TODO: Return error code

	return await table.update({
		data: {
			allow: body.allow === undefined ? undefined : +(body.allow as string),
			deny: body.deny === undefined ? undefined : +(body.deny as string),
		},
		where: {
			[`${type}Uid_${tableName}Uid`]: {
				[`${type}Uid`]: typeUid,
				[`${tableName}Uid`]: tableUid,
			},
		},
	})
})
