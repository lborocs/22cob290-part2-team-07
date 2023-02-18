<script setup lang="ts">
import {
	createRoleOverride,
	createUserOverride,
	deleteRoleOverride,
	deleteUserOverride,
} from "@/types/override"
import { requires } from "@/middleware/permission"
import { Permission } from "@/types/permission"

definePageMeta({
	name: "Topic Permissions",
	middleware: [requires(Permission.Permission_Override)],
})

const route = useRoute()
const { data: topic, refresh } = await useFetch(
	`/api/permission/topic/${route.params.uid}`,
)
</script>

<template>
	<div class="head">
		<h2>
			<NuxtLink :to="`/knowledge/search?topic=${topic?.uid}`">{{
				topic?.name
			}}</NuxtLink>
		</h2>
		<ButtonNuxt
			icon="material-symbols:topic-outline-rounded"
			:to="`/knowledge/search?topic=${topic?.uid}`"
			>{{ topic?._count.posts }}</ButtonNuxt
		>
	</div>

	<PermissionOverrideView
		:route-prefix="`/knowledge/topic/${route.params.uid}`"
		:roles="topic!.overrideRoles"
		:users="topic!.overrideUsers"
		@create-override:role="
			createRoleOverride('topic', topic!.uid, $event).then(() => refresh())
		"
		@create-override:user="
			createUserOverride('topic', topic!.uid, $event).then(() => refresh())
		"
		@delete-override:role="
			deleteRoleOverride('topic', topic!.uid, $event).then(() => refresh())
		"
		@delete-override:user="
			deleteUserOverride('topic', topic!.uid, $event).then(() => refresh())
		"
	/>
</template>

<style scoped lang="scss">
@use "@/assets/core";

.head {
	@extend %card, %flex-space;
	background-color: var(--colour-background-3);
	h2 > * {
		@extend %link;
	}
}
</style>
