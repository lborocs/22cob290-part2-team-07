<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { RouteLocationRaw } from "vue-router"

defineProps<{
	to: RouteLocationRaw
	icon: string
}>()
</script>

<template>
	<Button :icon="icon">
		<NuxtLink :to="to">
			<slot />
		</NuxtLink>
	</Button>
</template>

<style scoped lang="scss">
a {
	color: var(--colour-background-1);
	text-decoration: none;
}
</style>
