import prisma from "@/prisma"
import { Permission } from "@/types/permission"

const tablePrefixRole = "pOverrideRole"
const tablePrefixUser = "pOverrideUser"

const typeTableMap: { [x: string]: string } = {
	post: "Post",
	topic: "Topic",
	project: "Project",
}

type Tables =
	| typeof prisma["pOverrideRolePost"]
	| typeof prisma["pOverrideRoleProject"]
	| typeof prisma["pOverrideRoleTopic"]
	| typeof prisma["pOverrideUserPost"]
	| typeof prisma["pOverrideUserPost"]
	| typeof prisma["pOverrideUserProject"]
	| typeof prisma["pOverrideUserTopic"]

function typeTable(tableName: string, type: string): Tables {
	const tableKey = ((type === "role" ? tablePrefixRole : tablePrefixUser) +
		typeTableMap[tableName]) as keyof typeof prisma
	return prisma[tableKey]
}

export default defineEventHandler(async event => {
	const body = await readBody(event)

	const tableName = body.table as string
	const tableUid = +(body.tableUid as string)
	const type = body.type as string
	const typeUid =
		type === "role" ? +(body.roleUid as string) : (body.userUid as string)

	const table = typeTable(tableName, type)
	if (table == undefined) return null // TODO: Return error code

	return await table.create({
		data: {
			allow: Permission.NONE,
			deny: Permission.NONE,
			role: { connect: { uid: typeUid } },
			[tableName]: { connect: { uid: tableUid } },
		},
	})
})
