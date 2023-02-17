<script setup lang="ts">
import { PermissionCollection } from "@/types/permission"
definePageMeta({
	name: "Post Role Permissions",
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
