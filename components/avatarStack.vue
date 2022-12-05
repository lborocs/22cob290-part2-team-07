<template>
	<div class="assignees">
		<img
			v-for="person in array"
			:src="`https://ui-avatars.com/api/?name=${person.name.replace(
				' ',
				'+',
			)}&background=random&color=fff&size=42&rounded=true`"
			:alt="`Avatar for ${person}`"
		/>
		<div v-if="array.length > 3" class="more-assignees">
			+{{ array.length - 3 }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.assignees {
	display: flex;
	flex-direction: row-reverse;
	img:not(:last-child) {
		margin-left: -1.5rem;
	}
	.more-assignees {
		display: block;
		--image-size: 42px;
		width: var(--image-size);
		height: var(--image-size);
		background-color: var(--colour-accent);
		border-radius: 100vmax;
		display: grid;
		place-items: center;
	}
}
</style>

<script setup lang="ts">
const props = defineProps<{
	array: User[]
}>()
</script>
