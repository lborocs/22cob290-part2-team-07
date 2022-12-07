<script setup lang="ts">
import { profilePicture } from "@/types/user"

withDefaults(
	defineProps<{
		uid: number
		name: string
		size: number
		isLink?: boolean
	}>(),
	{
		isLink: true,
	},
)
</script>

<template>
	<!-- IK the img is repeated, couldn't think of a neater way -->
	<NuxtLink v-if="isLink" :to="`/user/${uid}`"
		><img
			:src="profilePicture(name, size)"
			:alt="`Profile Picture of ${name}`"
			:width="size"
			:height="size"
	/></NuxtLink>
	<img
		v-else
		:src="profilePicture(name, size)"
		:alt="`Profile Picture of ${name}`"
		:width="size"
		:height="size"
	/>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

img {
	@extend .profile-picture;
}
</style>
