<script setup lang="ts">
import { PermissionCollection } from "@/types/permission"

definePageMeta({
	name: "Project User Permissions",
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
