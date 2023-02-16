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
}>()

const { data: allRoles } = useLazyFetch("/api/roles")

const availibleRoles = $computed(
	() =>
		allRoles.value?.filter(
			r => props.roles.findIndex(ro => ro.role.uid === r.uid) === -1,
		) ?? [],
)

const modalAddRole = useModal()
const modalAddRoleForm = ref<HTMLFormElement>()
const modalAddUser = useModal()
const modalAddUserForm = ref<HTMLFormElement>()

function createRoleOverride() {
	const data = form2Object(modalAddRoleForm.value!)
	modalAddRole.hide()
	const role: Role["uid"] | undefined = data["role"]
	if (role != undefined) emit("createOverride:role", role)
}
function createUserOverride() {
	const data = form2Object(modalAddUserForm.value!)
	modalAddUser.hide()
	const user: User["uid"] | undefined = data["user"]
	if (user != undefined) emit("createOverride:user", user)
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
		<p v-if="roles.length == 0">No Role Overrides exists.</p>
		<PermissionRolebar
			v-for="override in roles"
			:key="override.role.uid"
			:role="override.role"
			:prefix="routePrefix"
		/>
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
		<p v-if="users.length == 0">No User Overrides exists.</p>
		<div v-for="override in users" :key="override.user.uid" class="user-chunk">
			<UserIcon
				:email="override.user.email"
				:name="override.user.name"
				:size="50"
			/>
			<UserName :email="override.user.email" :name="override.user.name" />
			<span class="dimmed">{{ rolesTitle(override.user.roles) }}</span>
			<ButtonNuxt
				icon="material-symbols:edit-outline-rounded"
				:fix="true"
				:to="`${routePrefix}/user/${override.user.uid}`"
				>Edit</ButtonNuxt
			>
		</div>
	</section>
	<Modal :control="modalAddRole" title="Role Override">
		<form ref="modalAddRoleForm" @submit.prevent="createRoleOverride()">
			<template v-for="role in availibleRoles">
				<input
					:id="`role-override-add-${role.uid}`"
					type="radio"
					name="role"
					:value="role.uid"
					required
				/>
				<label :for="`role-override-add-${role.uid}`">{{ role.name }}</label>
			</template>
			<ModalFooter
				><Button type="submit" icon="material-symbols:add"
					>Add</Button
				></ModalFooter
			>
		</form>
	</Modal>
	<Modal :control="modalAddUser" title="User Override">
		<form ref="modalAddUserForm" @submit.prevent="createUserOverride()">
			<template v-for="role in availibleRoles">
				<!-- <input
					:id="`role-override-add-${role.uid}`"
					type="radio"
					name="role"
					:value="role.uid"
					required
				/>
				<label :for="`role-override-add-${role.uid}`">{{ role.name }}</label> -->
			</template>
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
</style>
