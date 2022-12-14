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
	<NuxtLink v-if="isLink" :to="`/client/${uid}`"
		><img
			:src="profilePicture(name)"
			:alt="`Profile Picture of ${name}`"
			:width="size"
			:height="size"
	/></NuxtLink>
	<img
		v-else
		:src="profilePicture(name)"
		:alt="`Profile Picture of ${name}`"
		:width="size"
		:height="size"
	/>
</template>

<style scoped lang="scss">
@use "~/assets/core";

img {
	@extend %profile-picture;
}
</style>
