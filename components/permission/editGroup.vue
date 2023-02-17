<script setup lang="ts">
import {
	Permission,
	permissionCollection,
	PermissionCollection,
} from "@/types/permission"

defineProps<{
	allow: Permission
	deny: Permission
	permissions: PermissionCollection
}>()

defineEmits<{
	(e: "update:allow", value: Permission): void
	(e: "update:deny", value: Permission): void
}>()
</script>

<template>
	<div>
		<PermissionEdit
			v-for="perm in permissionCollection(permissions)"
			:key="perm"
			:mask="perm"
			:allow="allow"
			:deny="deny"
			@update:allow="$emit('update:allow', $event)"
			@update:deny="$emit('update:deny', $event)"
			class="permission"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
