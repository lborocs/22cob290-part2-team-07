import * as override from "./_override"

export default defineEventHandler(async event => {
	const query = getQuery(event)

	const tableName = query.table as string
	const tableUid = +(query.tableUid as string)
	const type = query.type as string
	const typeUid =
		type === "role" ? +(query.roleUid as string) : (query.userUid as string)

	const table = override.typeTable(tableName, type)
	if (table == undefined) return null // TODO: Return error code

	return (await table.findUnique({
		where: {
			[`${type}Uid_${tableName}Uid`]: {
				[`${type}Uid`]: typeUid,
				[`${tableName}Uid`]: tableUid,
			},
		},
		include: {
			[type]: true,
			[tableName]: true,
		},
	})) as PermissionOverride[]
})
