<script setup lang="ts">
import { Permission, PermissionCollection } from "@/types/permission"
import { requires } from "@/middleware/permission"
definePageMeta({
	name: "Project Role Permissions",
	middleware: [requires(Permission.Permission_Override)],
})
</script>

<template>
	<PermissionOverrideRole
		table="project"
		:table-uid="+$route.params.uid"
		:role-uid="+$route.params.role"
		:permissions="PermissionCollection.Task"
	/>
</template>

<style scoped lang="scss"></style>
