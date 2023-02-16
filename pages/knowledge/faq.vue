<script setup lang="ts">
import {
	has,
	Permission,
	permissions,
	permissionsUser,
} from "@/types/permission"

definePageMeta({
	name: "Knowledge FAQ",
})

const route = useRoute()
const { data: currentUser } = await useCurrentUser()
const { data: post } = await useFetch(`/api/faq`, {
	query: { u: currentUser.value!.uid },
})
if (!post.value) console.error(`Post<FAQ> does not exist!`)
</script>

<template>
	<KnowledgePost
		:post="post!"
		v-if="post && (has(permissions(permissions(permissionsUser(currentUser!.roles), post.topic.overrideRoles, post.topic.overrideUsers), post.overrideRoles, post.overrideUsers), Permission.Post_Read) || post!.ownerId == currentUser!.uid)"
	/>
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
