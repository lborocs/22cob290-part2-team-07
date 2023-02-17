<script setup lang="ts">
import { PermissionCollection } from "@/types/permission"
definePageMeta({
	name: "Topic Role Permissions",
})
</script>

<template>
	<PermissionOverrideRole
		table="topic"
		:table-uid="+$route.params.uid"
		:role-uid="+$route.params.role"
		:permissions="PermissionCollection.Topic | PermissionCollection.Post"
	/>
</template>

<style scoped lang="scss"></style>
