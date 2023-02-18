<script setup lang="ts">
import { Permission, PermissionCollection } from "@/types/permission"
import { requires } from "@/middleware/permission"
definePageMeta({
	name: "Post Role Permissions",
	middleware: [requires(Permission.Permission_Override)],
})
</script>

<template>
	<PermissionOverrideRole
		table="post"
		:table-uid="+$route.params.uid"
		:role-uid="+$route.params.role"
		:permissions="PermissionCollection.Post"
	/>
</template>

<style scoped lang="scss"></style>
