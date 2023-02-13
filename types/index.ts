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

export {}

declare global {
	type DateString = string | Date

	type KanbanTask = Task & {
		project?: Project | null
		assignees: User[]
		subtasks: Subtask[]
	}

	interface RoleName {
		name: string
		rank: number
	}

	// User with roles
	type UserR = User & {
		roles: RoleName[]
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
