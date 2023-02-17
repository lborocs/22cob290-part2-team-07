import { Role } from ".prisma/client"

export const everyoneUid: Role["uid"] = 1
export const adminUid: Role["uid"] = 2

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

	ALL = ~(~0 << 15) & ~Administrator, // Every permission. EXCEPT Administrator
	ALL_ADMIN = ALL | Administrator, // Every permission
}
if (!(Permission.ALL_ADMIN <= ~(~0 << 31))) {
	console.error("The maximum size of the bitfield should be 32 bits")
}

export interface PermissionGroup {
	allow: number | Permission
	deny: number | Permission
}

export function permissionsUser(roles: Role[] | undefined | null) {
	if (roles == null) return Permission.NONE
	const index = roles.findIndex(r => r.uid === everyoneUid)
	if (index === -1) return Permission.NONE
	return combinePermissions(
		combinePermissions(Permission.NONE, [roles[index]]),
		[...roles.slice(undefined, index), ...roles.slice(index + 1)],
	)
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

export function permissions(
	permissions: Permission,
	roleOverrides?: PermissionGroup[],
	userOverrides?: PermissionGroup[],
) {
	if (has(permissions, Permission.Administrator)) return Permission.ALL_ADMIN
	if (roleOverrides !== undefined)
		permissions = combinePermissions(permissions, roleOverrides)
	if (userOverrides !== undefined)
		permissions = combinePermissions(permissions, userOverrides)
	return permissions
}

export function has(permissions: Permission, flags: Permission): boolean {
	return (permissions & flags) === flags
}

export enum PermissionState {
	ALLOW = "allow",
	DENY = "deny",
	NEUTRAL = "neutral",
}

export enum PermissionCollection {
	Admin = 1 << 0,
	Post = 1 << 1,
	Topic = 1 << 2,
	Project = 1 << 3,
	Task = 1 << 4,
	Client = 1 << 5,
	ALL = ~(~0 << 6),
}

interface PermissionInfo {
	name: string
	desc: string
	collection: PermissionCollection
}
const permissionInfoMap: {
	[x: number]: PermissionInfo
} = {
	[Permission.Administrator]: {
		name: "Administrator",
		desc: "A user can do anything without restriction regardless of other permissions.",
		collection: PermissionCollection.Admin,
	},
	[Permission.Topic_Create]: {
		name: "Topic Create",
		desc: "Create a new Topic",
		collection: PermissionCollection.Topic,
	},
	[Permission.Topic_Delete]: {
		name: "Topic Delete",
		desc: "Delete an existing Topic.",
		collection: PermissionCollection.Topic,
	},
	[Permission.Post_Read]: {
		name: "Post Read",
		desc: "Read a Post by other Users.",
		collection: PermissionCollection.Post,
	},
	[Permission.Post_Create]: {
		name: "Post Create",
		desc: "Create a new Post under a Topic.",
		collection: PermissionCollection.Post,
	},
	[Permission.Post_Delete]: {
		name: "Post Delete",
		desc: "Delete an existing Post.",
		collection: PermissionCollection.Post,
	},
	[Permission.Post_Edit]: {
		name: "Post Edit",
		desc: "Edit an existing Post written by other Users.",
		collection: PermissionCollection.Post,
	},
	[Permission.Project_Create]: {
		name: "Project Create",
		desc: "Create a new Project.",
		collection: PermissionCollection.Project,
	},
	[Permission.Project_Delete]: {
		name: "Project Delete",
		desc: "Delete an existing Project.",
		collection: PermissionCollection.Project,
	},
	[Permission.Client_Create]: {
		name: "Client Create",
		desc: "Create a new Client.",
		collection: PermissionCollection.Client,
	},
	[Permission.Client_Delete]: {
		name: "Client Delete",
		desc: "Delete an existing Client.",
		collection: PermissionCollection.Client,
	},
	[Permission.Task_Create]: {
		name: "Task Create",
		desc: "Create a new Task for a Project.",
		collection: PermissionCollection.Task,
	},
	[Permission.Task_Delete]: {
		name: "Task Delete",
		desc: "Delete an existing Task.",
		collection: PermissionCollection.Task,
	},
	[Permission.Task_Assign]: {
		name: "Task Assign",
		desc: "Add users to a Task.",
		collection: PermissionCollection.Task,
	},
	[Permission.Task_Status]: {
		name: "Task Status",
		desc: "Edit the Status of a Task that you are not assigned to.",
		collection: PermissionCollection.Task,
	},
}

export const permissionList = [
	Permission.Administrator,
	Permission.Topic_Create,
	Permission.Topic_Delete,
	Permission.Post_Read,
	Permission.Post_Create,
	Permission.Post_Delete,
	Permission.Post_Edit,
	Permission.Project_Create,
	Permission.Project_Delete,
	Permission.Client_Create,
	Permission.Client_Delete,
	Permission.Task_Create,
	Permission.Task_Delete,
	Permission.Task_Assign,
	Permission.Task_Status,
]

export function permissionInfo(permission: Permission) {
	return permissionInfoMap[permission]
}

export function permissionCollection(
	collection: PermissionCollection,
): Permission[] {
	return permissionList.filter(p => permissionInfo(p).collection & collection)
}
