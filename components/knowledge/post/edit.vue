<script setup lang="ts">
defineProps<{
	post: Post
}>()
</script>

<template>
	<textarea name="" id="" v-model="post.markdown" />
</template>

<style scoped lang="scss">
textarea {
	width: 100%;
	min-height: 10em;
}
</style>