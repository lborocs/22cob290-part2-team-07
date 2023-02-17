<script setup lang="ts">
import { Role } from ".prisma/client"
import { Icon } from "@iconify/vue"
import { form2Object } from "~~/types/generic"

definePageMeta({
	name: "Permissions",
})

const { data: roles } = await useFetch("/api/roles")
const editableRoles = $computed(() => roles.value!.slice(1, -1))

const changes = $computed(() => {
	let index = roles.value![1].rank
	for (const role of editableRoles) {
		if (role.rank !== index++) return true
	}
	return false
})

type RoleC = Role & {
	_count: {
		users: number
	}
}

const modalAdd = useModal()
const formAdd = ref<HTMLFormElement>()

function moveDir(role: RoleC, direction: 1 | -1) {
	const index = roles.value!.findIndex(r => r.uid === role.uid)
	const ondex = index + direction
	const other = roles.value![ondex]
	roles.value![index] = other
	roles.value![ondex] = role
}

const moveUp = (role: RoleC) => moveDir(role, -1)
const moveDown = (role: RoleC) => moveDir(role, 1)

async function createRole() {
	modalAdd.hide()
	const name = form2Object(formAdd.value!).rolename
	const role = await $fetch("/api/permission/role", {
		method: "POST",
		body: {
			name,
		},
	})
	role._count = { users: 0 }
	roles.value!.push(role as RoleC, roles.value!.pop()!)
}
function deleteRole(role: Role) {
	const index = roles.value!.findIndex(r => r.uid === role.uid)
	roles.value!.splice(index, 1)
	editableRoles.forEach((role, index) => {
		role.rank = index + 1
	})
	return $fetch("/api/permission/role", {
		method: "DELETE",
		body: {
			uid: role.uid,
		},
	})
}

async function save() {
	const data = editableRoles.map(r => r.uid)
	const result = await $fetch("/api/permission/roles", {
		method: "PUT",
		body: {
			roles: data,
		},
	})
	roles.value = [roles.value![0], ...result, roles.value!.at(-1)!]
}
</script>

<template>
	<section class="roles">
		<div class="head">
			<h2>Roles</h2>
			<div>
				<Button
					v-if="changes"
					:disabled="!changes"
					icon="material-symbols:save-outline-rounded"
					@click="save()"
					>Save</Button
				>
				<Button icon="material-symbols:add" @click="modalAdd.show()"
					>Add</Button
				>
			</div>
		</div>
		<hr />
		<PermissionRolebar :role="roles![0]" />
		<PermissionRolebar
			v-for="role in editableRoles"
			:key="role.uid"
			:role="role"
		>
			<Button
				icon="material-symbols:delete-forever-outline-rounded"
				@click="deleteRole(role)"
				>Del</Button
			>
			<div class="move">
				<button
					:disabled="editableRoles.findIndex(r => r.uid === role.uid) === 0"
					@click="moveUp(role)"
				>
					<Icon icon="material-symbols:arrow-drop-up-rounded" />
				</button>
				<button
					:disabled="
						editableRoles.findIndex(r => r.uid === role.uid) ===
						editableRoles.length - 1
					"
					@click="moveDown(role)"
				>
					<Icon icon="material-symbols:arrow-drop-down-rounded" />
				</button>
			</div>
		</PermissionRolebar>
		<PermissionRolebar :role="roles!.at(-1)!" />
	</section>
	<Modal :control="modalAdd" title="Create Role">
		<form ref="formAdd" @submit.prevent="createRole()">
			<input type="text" name="rolename" placeholder="Role Name..." required />
			<ModalFooter
				><Button type="submit" icon="material-symbols:add"
					>Create</Button
				></ModalFooter
			>
		</form>
	</Modal>
</template>

<style scoped lang="scss">
@use "@/assets/core";
@use "@/assets/button";

section.roles {
	@extend %card;
	.head {
		@extend %flex-space;
		div {
			@extend %flex-row;
		}
	}
	.move > * {
		@extend %button;
		padding: 0;
	}
}

form input {
	@extend %input;
	width: 75%;
}
</style>
