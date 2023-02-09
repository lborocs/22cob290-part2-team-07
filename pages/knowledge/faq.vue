<script setup lang="ts">
import {
	has,
	Permission,
	permissions,
	permissionsChain,
} from "@/types/permission"

definePageMeta({
	name: "Knowledge FAQ",
})

const route = useRoute()
const currentUser = useCurrentUser()
const { data: post } = await useFetch(`/api/faq`, {
	query: { u: currentUser.value!.uid },
})
if (!post.value) console.error(`Post<FAQ> does not exist!`)
</script>

<template>
	<KnowledgePost
		:post="post!"
		v-if="post && has(permissionsChain(permissions(currentUser!.roles, post.topic.overrideRoles, post.topic.overrideUsers), post.overrideRoles, post.overrideUsers), Permission.Post_Read)"
	/>
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
