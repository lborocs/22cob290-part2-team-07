<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { RouteLocationRaw } from "vue-router"

defineProps<{
	location: RouteLocationRaw
	name: string
	icon: string
}>()
</script>

<template>
	<NuxtLink :to="location">
		<Icon :icon="icon" />
		<span>{{ name }}</span>
	</NuxtLink>
</template>

<style scoped lang="scss">
a {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
