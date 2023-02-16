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

const showDiv = ref(true)
</script>

<template>
	<div
		@mouseover="showDiv = true"
		@mouseleave="showDiv = true"
		class="profile-picture-container"
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
			<img
				:src="profilePicture(name)"
				:alt="`Profile Picture of ${name}`"
				:width="size"
				:height="size"
				class="profile-picture"
			/>
			<div class="profile-name">
				<h3>{{ name }}</h3>
			</div>
			<div class="profile-email">
				<p>{{ email + emailDomain }}</p>
			</div>
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

	.profile-info {
		position: absolute;
		top: -20%;
		right: 50%;
		display: grid;
		grid-template-areas:
			"pic name"
			"email email";
		background-color: var(--colour-highlight);
		border: 0.05em solid var(--colour-accent);
		padding: 0.5em;
		border-radius: 0.4em;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
		z-index: 1;
		justify-items: center;
		align-items: center;
		width: max-content;
	}

	.profile-image {
		grid-area: pic;
	}
	.profile-name {
		color: var(--colour-text);
		margin: 0;
		margin-left: 0.5em;
		grid-area: name;
	}
	.profile-email {
		color: var(--colour-text);
		margin: 0;
		font-size: 0.7em;
		grid-area: email;
		// width: 100%;
	}
}
</style>
