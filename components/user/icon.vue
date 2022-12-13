<script setup lang="ts">
import { profilePicture } from "@/types/user"

withDefaults(
	defineProps<{
		uid: number
		name: string
		size: number
		isLink?: boolean
		isClient?: boolean
	}>(),
	{
		isLink: true,
		isClient: false,
	},
)
</script>

<!-- IK the img is repeated, couldn't think of a neater way -->
<template>
	<NuxtLink v-if="isLink && !isClient" :to="`/user/${uid}`"
		><img
			:src="profilePicture(name)"
			:alt="`Profile Picture of ${name}`"
			:width="size"
			:height="size"
	/></NuxtLink>
	<NuxtLink v-else-if="isLink && isClient" :to="`/client/${uid}`"
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
