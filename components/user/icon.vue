<script setup lang="ts">
import { profilePicture } from "@/types/user"

defineProps<{
	uid: number
	name: string
}>()
</script>

<template>
	<NuxtLink :to="`/user/${uid}`"><img :src="profilePicture(name)" /></NuxtLink>
</template>

<style scoped lang="scss">
img {
	border-radius: 50%;
}
</style>
