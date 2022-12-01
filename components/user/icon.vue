<script setup lang="ts">
import { profilePicture } from "@/types/user"

defineProps<{
	name: string
}>()
</script>

<template>
	<img :src="profilePicture(name)" />
</template>

<style scoped lang="scss">
img {
	border-radius: 50%;
}
</style>
