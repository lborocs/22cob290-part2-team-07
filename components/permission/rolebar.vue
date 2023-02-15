<script setup lang="ts">
import { Prisma, Role } from ".prisma/client"
import { Icon } from "@iconify/vue"

defineProps<{
	role: Role & {
		_count: {
			users: number
		}
	}
}>()
</script>

<template>
	<div class="role">
		<h3>
			<NuxtLink :to="`/permission/role/${role.uid}/`">{{ role.name }}</NuxtLink>
		</h3>
		<ButtonNuxt
			icon="material-symbols:group-outline"
			:to="`/permission/role/${role.uid}/users`"
			:fix="true"
			>{{ role._count.users }}</ButtonNuxt
		>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/core";

div.role {
	@extend %flex-row, %flex-centre;
	justify-content: space-between;
}

h3 a {
	@extend %link;
}
</style>
