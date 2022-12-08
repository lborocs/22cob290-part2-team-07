<script setup lang="ts">
defineProps<{
	uid: number
	uname: string
	rank: string
	assigned?: number
}>()
</script>

<template>
	<div class="flex-col card-small">
		<NuxtLink :to="`/user/${uid}`">
			<UserIcon :uid="uid" :name="uname" :size="50" />
			<h3 class="card-margins">{{ uname }}</h3>
		</NuxtLink>
		<p class="dimmed card-margins">{{ rank }}</p>
		<p class="card-margins">
			Assigned hours
			<span class="detail-highlight"> {{ assigned }} 0 </span>
		</p>
	</div>
</template>

<style lang="scss">
@use "~/assets/core";

.flex-col {
	@extend %flex-col;
}

.card-small {
	@extend %card-small;
}

.detail-highlight {
	font-weight: 800;
	background-color: var(--colour-card-highlight, var(--colour-green));
	padding: 0.5rem;
	border-radius: 0.25rem;
	margin-left: auto;
	display: inline-flex;
}

.dimmed {
	color: var(--colour-text-faded);
}

.card-margins {
	margin: 0 0 0.25rem 0; // top right bottom left
}
</style>
