<script setup lang="ts">
import {
	has,
	Permission,
	permissions,
	permissionsUser,
} from "@/types/permission"

// defining the page
definePageMeta({
	name: "Profile view",
})

const route = useRoute()
const { data: user } = await useFetch(`/api/user/${route.params.id}/posts`)
if (!user.value) {
	navigateTo("/user/error")
}

const { data: currentUser } = useCurrentUser()
</script>

<!-- template for the majority of the code to makeup the profile view page -->
<template>
	<!-- returns the ID of the user who is currently logged in -->

	<!-- The main card which has all the information being presented to the user for this page -->
	<profile-view-card>
		<template #name>
			<h2 id="title-card">name</h2>
		</template>
		<template #account>
			<h2 id="title-card">Account</h2>
		</template>
		<template #hierachy>
			<h2 id="hierarchy-card">Rank</h2>
		</template>
	</profile-view-card>

	<div>
		<template v-for="post in user!.posts" :key="post.uid">
			<KnowledgePostSnippet
				v-bind="post"
				:owner="user!"
				v-if="has(permissions(permissions(permissionsUser(currentUser!.roles), post.topic.overrideRoles, post.topic.overrideUsers), post.overrideRoles, post.overrideUsers), Permission.Post_Read) || post.ownerId === currentUser!.uid"
			/>
		</template>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

#title-card {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}
</style>
