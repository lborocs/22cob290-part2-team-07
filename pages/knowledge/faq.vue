<script setup lang="ts">
definePageMeta({
	name: "Knowledge FAQ",
})

const route = useRoute()
const { data: post } = await useFetch(`/api/faq`)
if (!post.value) console.error(`Post<FAQ> does not exist!`)
</script>

<template>
	<KnowledgePost :post="post!" v-if="post" />
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
