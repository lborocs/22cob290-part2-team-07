<script setup lang="ts">
import { Icon } from "@iconify/vue"
defineProps<{
	icon: string
}>()
</script>

<template>
	<button><slot /> <Icon :icon="icon" /></button>
</template>

<style scoped lang="scss"></style>
