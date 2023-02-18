<script setup lang="ts">
import { Permission, PermissionCollection } from "@/types/permission"
import { requires } from "@/middleware/permission"

definePageMeta({
	name: "Post User Permissions",
	middleware: [requires(Permission.Permission_Override)],
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
