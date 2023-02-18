<script setup lang="ts">
import { Permission, PermissionCollection } from "@/types/permission"
import { requires } from "@/middleware/permission"

definePageMeta({
	name: "Project User Permissions",
	middleware: [requires(Permission.Permission_Override)],
})

const route = useRoute()
const { data: user } = await useFetch(`/api/user/${route.params.email}`)
</script>

<template>
	<PermissionOverrideUser
		table="project"
		:table-uid="+$route.params.uid"
		:user="user"
		:permissions="PermissionCollection.Task"
		v-if="user"
	/>
</template>

<style scoped lang="scss"></style>
