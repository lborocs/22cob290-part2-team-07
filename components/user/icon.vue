<script setup lang="ts">
import { profilePicture } from "@/types/user"

defineProps<{
	uid: number
	name: string
	size: number
}>()
</script>

<template>
	<NuxtLink :to="`/user/${uid}`"
		><img
			:src="profilePicture(name, size)"
			:alt="`Profile Picture of ${name}`"
			:width="size"
			:height="size"
	/></NuxtLink>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

img {
	@extend .profile-picture;
}
</style>
