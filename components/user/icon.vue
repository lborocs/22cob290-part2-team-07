<script setup lang="ts">
import { profilePicture } from "@/types/user"
import { rolesTitle, emailDomain } from "@/types/user"

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

const showDiv = ref(false)
</script>

<template>
	<div
		class="profile-picture-container"
		@mouseover="showDiv = true"
		@mouseleave="showDiv = false"
	>
		<NuxtLink v-if="isLink" :to="`/user/${email}`">
			<img
				:src="profilePicture(name)"
				:alt="`Profile Picture of ${name}`"
				:width="size"
				:height="size"
			/>
		</NuxtLink>
		<img
			v-else
			:src="profilePicture(name)"
			:alt="`Profile Picture of ${name}`"
			:width="size"
			:height="size"
		/>
		<div v-if="showDiv" class="profile-info">
			<p>{{ name }}</p>
			<p>{{ email }}</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";

img {
	@extend %profile-picture;
}

.profile-picture-container {
	position: relative;
	display: inline-block;

	.profile-info {
		position: absolute;
		top: -20%;
		left: 20%;
		transform: translateX(10%) translateY(-30%);
		background-color: var(--colour-highlight);
		border: 0.05em solid var(--colour-accent);
		padding: 0.1em;
		border-radius: 0.4em;
		// box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
		white-space: nowrap;
		z-index: 1;
	}

	.profile-name {
		color: var(--colour-text);
	}
	.profile-email {
		color: var(--colour-text);
	}
}
</style>
