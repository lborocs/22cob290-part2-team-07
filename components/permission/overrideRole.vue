<script setup lang="ts">
import { Post, Project, Role, Topic } from ".prisma/client"
import { Permission, PermissionCollection } from "@/types/permission"

const props = defineProps<{
	table: "project" | "post" | "topic"
	roleUid: Role["uid"]
	tableUid: Project["uid"] | Post["uid"] | Topic["uid"]
	permissions: PermissionCollection
}>()

const { data: override } = await useFetch("/api/permission/override", {
	method: "GET",
	params: {
		table: props.table,
		tableUid: props.tableUid,
		type: "role",
		roleUid: props.roleUid,
	},
})
usePageName(`${override.value![props.table].name} Role Permissions`)

let allow = $ref<Permission>(override.value!.allow)
let deny = $ref<Permission>(override.value!.deny)

async function save() {
	const perms = await $fetch("/api/permission/override", {
		method: "PUT",
		body: {
			table: props.table,
			tableUid: props.tableUid,
			type: "role",
			roleUid: props.roleUid,
			allow,
			deny,
		},
	})
	allow = perms?.allow as Permission
	deny = perms?.deny as Permission

	override.value!.allow = allow
	override.value!.deny = deny
}

const changes = $computed(
	() => allow !== override.value!.allow || deny !== override.value!.deny,
)
</script>

<template>
	<div class="head">
		<NuxtLink :to="`/permission/role/${override!.role.uid}`">
			<h2>{{ override!.role.name }}</h2>
		</NuxtLink>
		<Button
			icon="material-symbols:save-outline-rounded"
			:fix="true"
			@click="save()"
			:disabled="!changes"
			>Save</Button
		>
	</div>
	<PermissionEditGroup
		:permissions="permissions"
		v-model:allow="allow"
		v-model:deny="deny"
	/>
</template>

<style scoped lang="scss">
@use "@/assets/core";
.head {
	@extend %flex-space, %card;
	padding-top: 0;
	padding-bottom: 0;
	background-color: var(--colour-background-3);
	a {
		@extend %link;
	}
}
</style>
