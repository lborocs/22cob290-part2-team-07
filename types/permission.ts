import { User } from ".prisma/client"
import assert from "assert"

export enum Permission {
	NONE = 0, // No permissions

	Administrator = 1 << 0, // Administrator that should be given all permissions regardless of overwrites

	Topic_Create = 1 << 1, // Create a Topic
	Topic_Delete = 1 << 2, // Delete a Topic

	Post_Read = 1 << 3, // Read a Post
	Post_Create = 1 << 4, // Create a Post
	Post_Delete = 1 << 5, // Delete a Post
	Post_Edit = 1 << 6, // Edit a Post

	Project_Create = 1 << 7, // Create a Project
	Project_Delete = 1 << 8, // Delete a Project

	Client_Create = 1 << 9, // Create a Client
	Client_Delete = 1 << 10, // Delete a Client

	Task_Create = 1 << 11, // Create a Task.
	Task_Delete = 1 << 12, // Delete a Task.
	Task_Assign = 1 << 13, // Add users to a Task.
	Task_Status = 1 << 14, // Edit the Status of a Task that you are not assigned to.

	ALL = ~(~0 << 15), // Every permission.
}
assert(
	Permission.ALL <= ~(~0 << 31),
	"The maximum size of the bitfield should be 32 bits",
)

export interface PermissionGroup {
	allow: number | Permission
	deny: number | Permission
}
export interface PermissionRoleGroup extends PermissionGroup {
	rank: number
}

function combinePermissions(
	permissions: Permission,
	overrides: PermissionGroup[],
): Permission {
	let allow = Permission.NONE
	let deny = Permission.NONE
	for (const override of overrides) {
		deny |= override.deny
		allow |= override.allow
	}
	permissions &= ~deny
	permissions |= allow
	return permissions
}
function combinePermissionRoles(
	permissions: Permission,
	overrides: PermissionRoleGroup[],
) {
	return combinePermissions(
		permissions,
		overrides.sort((a, b) => a.rank - b.rank),
	)
}

export function permissions(
	roles: PermissionRoleGroup[],
	roleOverrides: PermissionRoleGroup[],
	userOverride: PermissionGroup,
): Permission {
	let permissions = Permission.NONE
	permissions = combinePermissionRoles(permissions, roles)
	if (has(permissions, Permission.Administrator)) return Permission.ALL
	if (roleOverrides !== undefined)
		permissions = combinePermissionRoles(permissions, roleOverrides)
	if (userOverride !== undefined)
		permissions = combinePermissions(permissions, [userOverride])
	return permissions
}

export function has(permissions: Permission, flags: Permission): boolean {
	return (permissions & flags) === flags
}
