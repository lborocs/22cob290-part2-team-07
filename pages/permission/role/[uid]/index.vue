<script setup lang="ts">
import { Permission, permissionList } from "@/types/permission"

definePageMeta({
	name: "Role",
})

const route = useRoute()
const { data: role } = await useFetch(`/api/role/${route.params.uid}`)
usePageName(`${role.value?.name} Role`)
</script>

<template>
	<div>
		<div class="head">
			<div class="title">
				<h2>{{ role?.name }}</h2>
				<ButtonNuxt
					icon="material-symbols:group-outline"
					:to="`/permission/role/${role!.uid}/users`"
					:fix="true"
					>{{ role._count.users }}</ButtonNuxt
				>
			</div>
			<span>The general Permissions given to any User assigned this role.</span>
		</div>
		<div>
			<PermissionEdit
				v-for="perm in permissionList"
				:key="perm"
				:mask="perm"
				v-model:allow="role!.allow"
				v-model:deny="role!.deny"
				class="permission"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/core";

.head {
	.title {
		@extend %flex-space;
	}

	background-color: var(--colour-background-3);
	padding: 1rem;
	padding-top: 0;
	margin-bottom: 2rem;
	border-radius: 1rem;
}

.permission {
	margin: 0.1rem 0;
}
</style>
