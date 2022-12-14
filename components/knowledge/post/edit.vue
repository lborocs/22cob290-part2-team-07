<script setup lang="ts">
import { Post } from ".prisma/client"

defineProps<{
	post: Post
}>()
</script>

<template>
	<Textarea
		name="markdown"
		:model="post.markdown"
		@update:model="post.markdown = $event"
	/>
</template>

<style scoped lang="scss">
.textarea {
	min-height: 50vh;
}
</style>
