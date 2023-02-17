<script setup lang="ts">
import { PermissionCollection } from "@/types/permission"

definePageMeta({
	name: "Post User Permissions",
})

const route = useRoute()
const { data: user } = await useFetch(`/api/user/${route.params.email}`)
</script>

<template>
	<PermissionOverrideUser
		table="post"
		:table-uid="+$route.params.uid"
		:user="user"
		:permissions="PermissionCollection.Post"
		v-if="user"
	/>
</template>

<style scoped lang="scss"></style>
