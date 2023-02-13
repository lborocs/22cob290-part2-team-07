<script setup lang="ts">
import {
	has,
	Permission,
	permissions,
	permissionsChain,
} from "@/types/permission"

definePageMeta({
	name: "Knowledge Post",
})

const route = useRoute()
const { data: currentUser } = await useCurrentUser()
const { data: post } = await useFetch(`/api/post/${route.params.id}`, {
	query: { u: currentUser.value!.uid },
})

if (!post.value) console.error(`Post<${route.params.id}> does not exist!`)
</script>

<template>
	<KnowledgePost
		:post="post!"
		v-if="post && has(permissionsChain(permissions(currentUser!.roles, post.topic.overrideRoles, post.topic.overrideUsers), post.overrideRoles, post.overrideUsers), Permission.Post_Read)"
	/>
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
