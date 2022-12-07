<script setup lang="ts">
import { Icon } from "@iconify/vue"
defineProps<{
	icon: string
}>()
</script>

<template>
	<span id="slot"><slot /></span> <Icon :icon="icon" />
</template>

<style scoped lang="scss">
// @use "~/assets/button";

// #btn {
// 	@extend %button;
// }
</style>
