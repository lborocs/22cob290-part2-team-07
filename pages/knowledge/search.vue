<script setup lang="ts">
import { emailDomain } from "@/types/user"

definePageMeta({
	name: "Knowledge Search Results",
})
const route = useRoute()
const { data: posts } = useFetch("/api/posts")
</script>

<template>
	<KnowledgeSearchbar id="searchbar" />
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
