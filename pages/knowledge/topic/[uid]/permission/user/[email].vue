<script setup lang="ts">
import { requires } from "@/middleware/permission"
import { Permission, PermissionCollection } from "@/types/permission"

definePageMeta({
	name: "Topic User Permissions",
	middleware: [requires(Permission.Permission_Override)],
})

const route = useRoute()
const { data: user } = await useFetch(`/api/user/${route.params.email}`)
</script>

<template>
	<PermissionOverrideUser
		table="topic"
		:table-uid="+$route.params.uid"
		:user="user"
		:permissions="PermissionCollection.Topic | PermissionCollection.Post"
		v-if="user"
	/>
</template>

<style scoped lang="scss"></style>
