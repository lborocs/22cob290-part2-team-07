<script setup lang="ts">
import { Prisma, Role } from ".prisma/client"
import { Icon } from "@iconify/vue"

withDefaults(
	defineProps<{
		role: Role & {
			_count: {
				users: number
			}
		}
		prefix?: string
	}>(),
	{
		prefix: "",
	},
)
</script>

<template>
	<div class="role">
		<h3>
			<NuxtLink :to="`${prefix}/permission/role/${role.uid}/`">{{
				role.name
			}}</NuxtLink>
		</h3>
		<div class="buttons">
			<ButtonNuxt
				icon="material-symbols:group-outline"
				:to="`/permission/role/${role.uid}/users`"
				:fix="true"
				>{{ role._count.users }}</ButtonNuxt
			>
			<slot />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/core";

div.role,
div.buttons {
	@extend %flex-space;
}

h3 a {
	@extend %link;
}
</style>
