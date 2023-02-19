<script setup lang="ts">
import { Role, User } from ".prisma/client"
import { rolesTitle } from "@/types/user"
import { form2Object } from "~~/types/generic"

const props = defineProps<{
	roles: OverrideRole[]
	users: OverrideUser[]
	routePrefix: string
}>()

const emit = defineEmits<{
	(e: "createOverride:role", uid: Role["uid"]): void
	(e: "createOverride:user", uid: User["uid"]): void
	(e: "deleteOverride:role", uid: Role["uid"]): void
	(e: "deleteOverride:user", uid: User["uid"]): void
}>()

const { data: allRoles } = useLazyFetch("/api/roles")
const { data: allUsers } = useLazyFetch("/api/users")

const availibleRoles = $computed(
	() =>
		allRoles.value?.filter(
			r => props.roles.findIndex(ro => ro.role.uid === r.uid) === -1,
		) ?? [],
)
const availibleUsers = $computed(
	() =>
		allUsers.value?.filter(
			u => props.users.findIndex(us => us.user.uid === u.uid) === -1,
		) ?? [],
)

const modalAddRole = useModal()
const modalAddRoleForm = ref<HTMLFormElement>()
const modalAddUser = useModal()
const modalAddUserSelection = ref<User[]>([])

function createRoleOverride() {
	const data = form2Object(modalAddRoleForm.value!)
	modalAddRole.hide()
	const role: Role["uid"] | undefined = data["role"]
	if (role != undefined) emit("createOverride:role", role)
}
function createUserOverride() {
	modalAddUser.hide()
	// TODO: Selection should only have single value
	for (const user of modalAddUserSelection.value) {
		emit("createOverride:user", user.uid)
	}
	modalAddUserSelection.value.length = 0
}
</script>

<template>
	<section>
		<div class="head">
			<h3>Role Overrides</h3>
			<Button
				icon="material-symbols:add-moderator-outline-rounded"
				@click="modalAddRole.show()"
				>Add</Button
			>
		</div>
		<hr />
		<p v-if="roles.length == 0">No Role Overrides exists.</p>
		<PermissionRolebar
			v-for="override in roles"
			:key="override.role.uid"
			:role="override.role"
		>
			<ButtonNuxt
				:to="`${routePrefix}/permission/role/${override.role.uid}`"
				icon="material-symbols:edit-outline-rounded"
				>Edit</ButtonNuxt
			>
			<Button
				icon="material-symbols:delete-forever-outline-rounded"
				@click="$emit('deleteOverride:role', override.role.uid)"
				>Remove</Button
			>
		</PermissionRolebar>
	</section>
	<section>
		<div class="head">
			<h3>User Overrides</h3>
			<Button
				icon="material-symbols:person-add-outline-rounded"
				@click="modalAddUser.show()"
				>Add</Button
			>
		</div>
		<hr />
		<p v-if="users.length == 0">No User Overrides exists.</p>
		<div v-for="override in users" :key="override.user.uid" class="user-chunk">
			<div class="info">
				<UserIcon
					:email="override.user.email"
					:name="override.user.name"
					:size="50"
				/>
				<UserName :email="override.user.email" :name="override.user.name" />
				<span class="dimmed">{{ rolesTitle(override.user.roles) }}</span>
			</div>
			<div class="buttons">
				<ButtonNuxt
					:to="`${routePrefix}/permission/user/${override!.user.email}`"
					icon="material-symbols:edit-outline-rounded"
					>Edit</ButtonNuxt
				>
				<Button
					icon="material-symbols:delete-forever-outline-rounded"
					@click="$emit('deleteOverride:user', override.user.uid)"
					>Remove</Button
				>
			</div>
		</div>
	</section>
	<Modal :control="modalAddRole" title="Role Override">
		<form ref="modalAddRoleForm" @submit.prevent="createRoleOverride()">
			<div v-for="role in availibleRoles">
				<input
					:id="`role-override-add-${role.uid}`"
					type="radio"
					name="role"
					:value="role.uid"
					required
				/>
				<label :for="`role-override-add-${role.uid}`">{{ role.name }}</label>
			</div>
			<ModalFooter
				><Button type="submit" icon="material-symbols:add"
					>Add</Button
				></ModalFooter
			>
		</form>
	</Modal>
	<Modal :control="modalAddUser" title="User Override">
		<form @submit.prevent="createUserOverride()">
			<UserSelect
				id="permission-user-add-selection"
				:users="availibleUsers"
				v-model:selection="modalAddUserSelection"
				:select-multiple="false"
			/>
			<ModalFooter
				><Button type="submit" icon="material-symbols:add"
					>Add</Button
				></ModalFooter
			>
		</form></Modal
	>
</template>

<style scoped lang="scss">
@use "@/assets/core";

section {
	@extend %card;

	.head {
		@extend %flex-space;
	}
}

form {
	@extend %flex-col;
}

.user-chunk {
	@extend %flex-space;
	.info {
		display: grid;
		grid-template:
			"icon name" auto
			"icon role" auto / auto auto;
		column-gap: 0.5rem;

		$areas: (
			icon: 1,
			name: 2,
			role: 3,
		);
		@each $name, $nth in $areas {
			:nth-child(#{$nth}) {
				grid-area: $name;
			}
		}
		margin-bottom: 1rem;
	}
	.buttons {
		@extend %flex-row;
	}
}
</style>
