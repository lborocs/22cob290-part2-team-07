<script setup lang="ts">
import { rolesTitle } from "@/types/user"

definePageMeta({
	name: "Role Users",
})

const route = useRoute()
const { data: role } = await useFetch(`/api/role/${route.params.uid}/users`)
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
			<ButtonNuxt
				icon="material-symbols:group-outline"
				:to="`/permission/role/${role!.uid}/users`"
				:fix="true"
				>{{ role?.users.length }}</ButtonNuxt
			>
		</div>
		<div class="user-container">
			<div
				v-for="user in role?.users"
				:key="user.uid"
				class="user-but-not-the-global-one"
			>
				<UserIcon :email="user.email" :name="user.name" :size="50" />
				<UserName :email="user.email" :name="user.name" />
				<span class="dimmed">{{ rolesTitle(user.roles) }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/core";

div.title {
	background-color: var(--colour-background-3);
	padding: 0.1rem 1rem;
	border-radius: 1rem;
	margin-bottom: 1rem;

	@extend %flex-row, %flex-centre;
	justify-content: space-between;

	h2 a {
		@extend %link;
	}
}

div.user-container {
	@extend %flex-row, %flex-centre;
	justify-content: flex-start;
}
.user-but-not-the-global-one {
	@extend %flex-col, %flex-centre, %card-small;
	background-color: var(--colour-background-2);
	padding: 2rem;
	margin: 1rem;
}
</style>
