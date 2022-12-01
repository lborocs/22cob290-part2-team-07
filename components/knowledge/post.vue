<script setup lang="ts">
defineProps<{
	uid: number
	title: string
	preview: string

	owner: User
	topics: Topic[]
	created: Date
}>()
</script>

<template>
	<article>
		<aside>
			<ButtonNuxt
				:to="`/knowledge/search/?q=&topic=${topics[0].uid}`"
				icon="material-symbols:topic-outline-rounded"
				>{{ topics[0].name }}</ButtonNuxt
			>
			<UserIcon :name="owner.name" />
			<span>{{ created.toDateString() }}</span>
		</aside>
		<main>
			<h2>{{ title }}</h2>
			<hr />
			<div class="preview">{{ preview }}</div>
			<ButtonNuxt
				:to="`/knowledge/post/${uid}`"
				icon="material-symbols:visibility-outline-rounded"
				>View</ButtonNuxt
			>
		</main>
	</article>
</template>

<style scoped lang="scss">
article {
	background-color: var(--colour-background-2);
}
</style>
