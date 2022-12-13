<script setup lang="ts">
import { profilePicture } from "@/types/user"

withDefaults(
	defineProps<{
		email: string
		name: string
		size: number
		isLink?: boolean
	}>(),
	{
		isLink: true,
	},
)
</script>

<!-- IK the img is repeated, couldn't think of a neater way -->
<template>
	<NuxtLink v-if="isLink" :to="`/user/${email}`"
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
