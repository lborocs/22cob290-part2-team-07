import {
	Post,
	POverrideRolePost,
	POverrideRoleTopic,
	POverrideUserPost,
	POverrideUserTopic,
	Project,
	Role,
	Subtask,
	Task,
	Topic,
	User,
} from ".prisma/client"
import { Permission } from "./permission"

export {}

declare global {
	type DateString = string | Date

	type KanbanTask = Task & {
		project?: Project | null
		assignees: User[]
		subtasks: Subtask[]
	}

	type CompleteProject = Project & {
		tasks: (Task & {
			assignees: (User & {
				roles: {
					name: string
					rank: number
				}[]
			})[]
			subtasks: Subtask[]
		})[]
	}

	interface RoleName {
		name: string
		rank: number
	}

	interface PermissionOverride {
		allow: Permission
		deny: Permission
	}

	interface OverrideRole extends PermissionOverride {
		role: Role & {
			_count: {
				users: number
			}
		}
	}
	interface OverrideUser extends PermissionOverride {
		user: UserR
	}

	// User with roles
	type UserR = User & {
		roles: RoleName[]
	}

	// User with roles and rank
	type UserRR = User & {
		roles: {
			name: string
			rank: number
		}[]
	}

	type PostR = Post & {
		topic: Topic & {
			overrideRoles: POverrideRoleTopic[]
			overrideUsers: POverrideUserTopic[]
		}
		overrideRoles: POverrideRolePost[]
		overrideUsers: POverrideUserPost[]
		owner: UserR
	}
}
