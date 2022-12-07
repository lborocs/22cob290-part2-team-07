<script setup lang="ts">
defineProps<{
	uid: number
	name: string
}>()
</script>

<template>
	<NuxtLink :to="`/user/${uid}`">{{ name }}</NuxtLink>
</template>

<style scoped lang="scss">
@use "~/assets/core";

a {
	@extend %link;
}
</style>
