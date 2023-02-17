<script setup lang="ts">
import {
	createRoleOverride,
	createUserOverride,
	deleteRoleOverride,
	deleteUserOverride,
} from "@/types/override"

definePageMeta({
	name: "Post Permissions",
})

const route = useRoute()
const { data: post, refresh } = await useFetch(
	`/api/permission/post/${route.params.uid}`,
)
</script>

<template>
	<div class="head">
		<h2>{{ post?.title }}</h2>
		<div class="topic">
			<h3>
				Topic:
				<NuxtLink
					:to="`/knowledge/search?topic=${post?.topic.uid}`"
					class="name"
					>{{ post?.topic.name }}</NuxtLink
				>
			</h3>
			<ButtonNuxt
				icon="material-symbols:gavel-rounded"
				:to="`/knowledge/topic/${post?.topic.uid}/permission/`"
				>Topic Permissions</ButtonNuxt
			>
		</div>
	</div>

	<PermissionOverrideView
		:route-prefix="`/knowledge/post/${route.params.uid}`"
		:roles="post!.overrideRoles"
		:users="post!.overrideUsers"
		@create-override:role="
			createRoleOverride('post', post!.uid, $event).then(() => refresh())
		"
		@create-override:user="
			createUserOverride('post', post!.uid, $event).then(() => refresh())
		"
		@delete-override:role="
			deleteRoleOverride('post', post!.uid, $event).then(() => refresh())
		"
		@delete-override:user="
			deleteUserOverride('post', post!.uid, $event).then(() => refresh())
		"
	/>
</template>

<style scoped lang="scss">
@use "@/assets/core";

.head {
	@extend %card;
	background-color: var(--colour-background-3);

	h2 {
		margin-bottom: 0;
	}

	h3 {
		font-weight: normal;
	}
	.topic {
		@extend %flex-space;
		.name {
			@extend %link;
		}
	}
}
</style>
