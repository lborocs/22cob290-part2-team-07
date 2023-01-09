<script setup lang="ts">
definePageMeta({
	name: "Knowledge Post",
})

const route = useRoute()
const { data: post } = await useFetch(`/api/post/${route.params.id}`)
if (!post.value) console.error(`Post<${route.params.id}> does not exist!`)
</script>

<template>
	<KnowledgePost :post="post!" v-if="post" />
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
