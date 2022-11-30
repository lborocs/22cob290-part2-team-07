<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { RouteLocationRaw } from "vue-router"

defineProps<{
	to: RouteLocationRaw
	icon: string
}>()
</script>

<template>
	<NuxtLink :to="to"
		><Button :icon="icon"><slot /></Button
	></NuxtLink>
</template>

<style scoped lang="scss"></style>
