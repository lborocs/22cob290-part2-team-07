import prisma from "@/prisma"

const tablePrefixRole = "pOverrideRole"
const tablePrefixUser = "pOverrideUser"

const typeTableMap: { [x: string]: string } = {
	post: "Post",
	topic: "Topic",
	project: "Project",
}

export type Tables =
	| typeof prisma["pOverrideRolePost"]
	| typeof prisma["pOverrideRoleProject"]
	| typeof prisma["pOverrideRoleTopic"]
	| typeof prisma["pOverrideUserPost"]
	| typeof prisma["pOverrideUserPost"]
	| typeof prisma["pOverrideUserProject"]
	| typeof prisma["pOverrideUserTopic"]

export function typeTable(tableName: string, type: string): Tables {
	const tableKey = ((type === "role" ? tablePrefixRole : tablePrefixUser) +
		typeTableMap[tableName]) as keyof typeof prisma
	return prisma[tableKey]
}
