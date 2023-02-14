<script setup lang="ts">
import { Icon } from "@iconify/vue"

defineProps<{
	theme: "light" | "dark" | "system"
}>()
</script>

<template>
	<Icon v-if="theme === 'light'" icon="material-symbols:light-mode-outline" />
	<Icon
		v-else-if="theme === 'dark'"
		icon="material-symbols:dark-mode-outline-rounded"
	/>
	<Icon
		v-else-if="theme === 'system'"
		icon="material-symbols:computer-outline-rounded"
	/>
</template>

<style scoped lang="scss"></style>
