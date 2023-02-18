<script setup lang="ts">
import {
	createRoleOverride,
	createUserOverride,
	deleteRoleOverride,
	deleteUserOverride,
} from "@/types/override"
import { requires } from "@/middleware/permission"
import { Permission } from "@/types/permission"

definePageMeta({
	name: "Project Permissions",
	middleware: [requires(Permission.Permission_Override)],
})

const route = useRoute()
const { data: project, refresh } = await useFetch(
	`/api/permission/project/${route.params.uid}`,
)
usePageName(`${project.value?.name} Permissions`)
</script>

<template>
	<PermissionOverrideView
		:route-prefix="`/project/${route.params.uid}`"
		:roles="project!.overrideRoles"
		:users="project!.overrideUsers"
		@create-override:role="
			createRoleOverride('project', project!.uid, $event).then(() => refresh())
		"
		@create-override:user="
			createUserOverride('project', project!.uid, $event).then(() => refresh())
		"
		@delete-override:role="
			deleteRoleOverride('project', project!.uid, $event).then(() => refresh())
		"
		@delete-override:user="
			deleteUserOverride('project', project!.uid, $event).then(() => refresh())
		"
	/>
</template>

<style scoped lang="scss"></style>
