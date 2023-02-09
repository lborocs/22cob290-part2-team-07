<script setup lang="ts">
definePageMeta({
	name: "Knowledge FAQ",
})

const route = useRoute()
const currentUser = useCurrentUser()
const { data: post } = await useFetch(`/api/faq`, {
	query: { u: currentUser.value!.uid },
})
if (!post.value) console.error(`Post<FAQ> does not exist!`)
</script>

<template>
	<KnowledgePost :post="post!" v-if="post" />
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss"></style>
