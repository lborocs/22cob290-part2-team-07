<script setup lang="ts">
defineProps<{
	email: string
	name: string
}>()
</script>

<template>
	<NuxtLink :to="`/user/${email}`">{{ name }}</NuxtLink>
</template>

<style scoped lang="scss">
@use "~/assets/core";

a {
	@extend %link;
}
</style>
