<script setup lang="ts">
import { emailDomain } from "@/types/user"

definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()

const topic = ref<Topic>()

watchEffect(async () => {
	if (!route.query.topic) {
		topic.value = {
			uid: -1,
			name: "",
		}
		return
	}
	const response = await $fetch(`/api/topic/${route.query.topic}`)
	topic.value = response
})

const posts: Post[] = [
	{
		uid: 12,
		owner: { uid: 2, email: `queen${emailDomain}`, name: "Queen" },
		topics: [
			{
				uid: 1,
				name: "Topic A",
			},
		],
		title: "Post Title",
		created: new Date(Date.now()),
		markdown: "My funky markdown",
	},
]
</script>

<template>
	<KnowledgeSearchbar id="searchbar" />
	<h3>Query: {{ $route.query.q }}</h3>
	<h3>Topic: {{ topic?.name }}</h3>
	<KnowledgePost v-for="post in posts" v-bind="post" :preview="post.markdown" />
</template>

<style scoped lang="scss">
@use "~/assets/mobile";

#searchbar {
	font-size: 0.7em;
	width: 70%;
	@media (max-width: mobile.$width) {
		width: 100%;
	}
}
</style>
