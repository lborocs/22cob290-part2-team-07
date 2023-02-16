import { Post, Project, Role, Topic, User } from ".prisma/client"

type TableName = "post" | "topic" | "project"
type TableUid = Post["uid"] | Topic["uid"] | Project["uid"]

function createOverride(
	tableName: TableName,
	tableUid: TableUid,
	typeName: "role" | "user",
	typeUid: Role["uid"] | User["uid"],
) {
	const attr = typeName + "Uid"
	return $fetch("/api/permission/override", {
		method: "POST",
		body: {
			table: tableName,
			tableUid,
			type: typeName,
			[attr]: typeUid,
		},
	})
}

export function createRoleOverride(
	type: TableName,
	typeUid: TableUid,
	roleUid: Role["uid"],
) {
	return createOverride(type, typeUid, "role", roleUid)
}

export function createUserOverride(
	type: TableName,
	typeUid: TableUid,
	userUid: User["uid"],
) {
	return createOverride(type, typeUid, "user", userUid)
}
