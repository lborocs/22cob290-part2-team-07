<script setup lang="ts">
import {
	has,
	Permission,
	permissions,
	permissionsUser,
} from "@/types/permission"

definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()

const { data: currentUser } = await useCurrentUser()
let query = ref(route.query)
let q = computed(() => {
	return Object.assign(query.value, { u: currentUser.value?.uid })
})
const { data: posts } = await useFetch("/api/search/post", {
	query: q,
})
watch(route, () => {
	query.value = route.query
})
</script>

<template>
	<KnowledgeSearchbar id="searchbar" />
	<template v-for="post in posts" :key="post.uid">
		<KnowledgePostSnippet
			v-bind="post"
			v-if="has(permissions(permissions(permissionsUser(currentUser?.roles), post.topic.overrideRoles, post.topic.overrideUsers), post.overrideRoles, post.overrideUsers), Permission.Post_Read) || post.ownerId === currentUser!.uid"
		/>
	</template>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";

#searchbar {
	@media (max-width: mobile.$width) {
		width: 100%;
	}
}
</style>
