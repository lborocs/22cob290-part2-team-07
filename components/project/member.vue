<script setup lang="ts">
defineProps<{
	uid: number
	uname: string
	rank: string
	assigned: number
}>()
</script>

<template>
	<div class="flex-col card-small">
		<NuxtLink :to="`/user/${uid}`">
			<UserIcon :uid="uid" :name="uname" :size="50" />
			<h3>{{ uname }}</h3>
		</NuxtLink>
		<p class="dimmed">{{ rank }}</p>
		<p>
			Assigned hours
			<span class="detail-highlight"> {{ assigned }}</span>
		</p>
	</div>
</template>

<style lang="scss">
@use "/assets/core.scss" as *;

.flex-col {
	@extend %flex-col;
}

.card-small {
	@extend .card-small;
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
</style>
