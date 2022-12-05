<script lang="ts">
defineProps<{
	uid: number
	name: string
	rank: string
}>()
</script>

<template>
	<div class="flex-col card-small">
		<a> </a>
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
</style>
