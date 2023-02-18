<script setup lang="ts">
import { Post, Project, Topic, User } from ".prisma/client"
import { Permission, PermissionCollection } from "@/types/permission"
import { rolesTitle } from "~~/types/user"

const props = defineProps<{
	table: "project" | "post" | "topic"
	user: UserR
	tableUid: Project["uid"] | Post["uid"] | Topic["uid"]
	permissions: PermissionCollection
}>()

const { data: override } = await useFetch("/api/permission/override", {
	method: "GET",
	params: {
		table: props.table,
		tableUid: props.tableUid,
		type: "user",
		userUid: props.user.uid,
	},
})
usePageName(`${override.value![props.table].name} User Permissions`)

let allow = $ref<Permission>(override.value!.allow)
let deny = $ref<Permission>(override.value!.deny)

async function save() {
	const perms = await $fetch("/api/permission/override", {
		method: "PUT",
		body: {
			table: props.table,
			tableUid: props.tableUid,
			type: "user",
			userUid: props.user.uid,
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
		<div class="user-info">
			<UserIcon :email="user.email" :name="user.name" :size="50" />
			<UserName :email="user.email" :name="user.name" />
			<span class="dimmed">{{ rolesTitle(user.roles) }}</span>
		</div>
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

	.user-info {
		margin: 1rem 0;
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
	}
}
</style>
