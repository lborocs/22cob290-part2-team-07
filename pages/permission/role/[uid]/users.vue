<script setup lang="ts">
import { rolesHighest, rolesTitle } from "@/types/user"
import {
	adminUid,
	everyoneUid,
	has,
	Permission,
	permissions,
	permissionsUser,
} from "@/types/permission"
import { requires } from "@/middleware/permission"
import { User } from ".prisma/client"

definePageMeta({
	name: "Role Users",
})

const route = useRoute()
const { data: role } = await useFetch(`/api/role/${route.params.uid}/users`)
const { data: currentUser } = useCurrentUser()

const { data: allUsers } = useLazyFetch("/api/users")
const availableUsers = $computed(
	() =>
		allUsers.value?.filter(
			u => role.value?.users.findIndex(ur => ur.uid === u.uid) === -1,
		) ?? [],
)

const modalAssign = useModal()
const modalAssignSelection = ref<User[]>([])

async function assignUsers() {
	modalAssign.hide()
	const users = modalAssignSelection.value.map(u => u.uid)
	role.value!.users.push(...users)
	await $fetch(`/api/role/${route.params.uid}/users`, {
		method: "PUT",
		body: {
			users,
		},
	})
}
async function deleteUser(user: User) {
	const index = role.value!.users.findIndex(u => u.uid === user.uid)
	role.value!.users.splice(index, 1)
	await $fetch(`/api/role/${route.params.uid}/users`, {
		method: "DELETE",
		body: {
			user: user.uid,
		},
	})
}
</script>

<template>
	<div>
		<div class="title">
			<h2>
				<NuxtLink :to="`/permission/role/${role?.uid}`">{{
					role?.name
				}}</NuxtLink>
				Role Users
			</h2>
			<div>
				<Button
					icon="material-symbols:assignment-ind-outline"
					:fix="true"
					@click="modalAssign.show()"
					v-if="
						has(permissions(permissionsUser(currentUser!.roles)), Permission.Permission_Add) && (+$route.params.uid !== everyoneUid) && (rolesHighest(currentUser!.roles).rank <= role!.rank)
					"
					>Assign</Button
				>
				<ButtonNuxt
					icon="material-symbols:group-outline"
					:to="`/permission/role/${role!.uid}/users`"
					:fix="true"
					>{{ role?.users.length }}</ButtonNuxt
				>
			</div>
		</div>
		<div class="user-container">
			<div v-for="user in role?.users" :key="user.uid" class="user-chunk">
				<UserIcon :email="user.email" :name="user.name" :size="50" />
				<UserName :email="user.email" :name="user.name" />
				<span class="dimmed">{{ rolesTitle(user.roles) }}</span>
				<Button
					v-if="
						has(permissions(permissionsUser(currentUser!.roles)), Permission.Permission_Add) && (+$route.params.uid !== everyoneUid) && (rolesHighest(currentUser!.roles).rank <= role!.rank)
					"
					:disabled="user.uid === currentUser!.uid"
					icon="material-symbols:delete-outline-rounded"
					@click="deleteUser(user)"
					>Remove</Button
				>
			</div>
		</div>
	</div>
	<Modal :control="modalAssign" title="Assign User">
		<UserSelect
			id="permission-role-user-assign"
			:users="availableUsers"
			v-model:selection="modalAssignSelection"
			:select-multiple="true"
		/>
		<ModalFooter>
			<Button
				type="submit"
				icon="material-symbols:assignment-ind-outline"
				@click="assignUsers()"
				>Assign</Button
			>
		</ModalFooter>
	</Modal>
</template>

<style scoped lang="scss">
@use "@/assets/core";

div.title {
	background-color: var(--colour-background-3);
	padding: 0.1rem 1rem;
	border-radius: 1rem;
	margin-bottom: 1rem;

	@extend %flex-space;

	h2 a {
		@extend %link;
	}
	div {
		@extend %flex-row;
	}
}

div.user-container {
	@extend %flex-space;
	justify-content: flex-start;
}
.user-chunk {
	@extend %flex-col, %flex-centre, %card-small;
	background-color: var(--colour-background-2);
	padding: 1rem;
	margin: 1rem;
	:last-child {
		margin-top: 0.5em;
	}
}
</style>
