<script setup lang="ts">
import { rankTitle } from "@/types/user"

const route = useRoute()
const { data: post } = await useFetch(`/api/post/${route.params.id}`)

// const
</script>

<template>
	<Sandwich v-if="post">
		<template #header-extra>
			<div class="owner">
				<UserIcon class="icon" v-bind="post.owner" :size="50" />
				<span>Posted By</span>
				<UserName v-bind="post.owner" />
				<span>{{ rankTitle(post.owner.rank) }}</span>
			</div>
		</template>
		<template #header>
			<h2>{{ post.title }}</h2>
		</template>
		<slot />
		<template #footer><Date class="date" :date="post.created" /></template>
		<NuxtPage :post="post" />
	</Sandwich>
	<KnowledgePostMissing v-else />
</template>

<style scoped lang="scss">
@use "sass:string";

.owner {
	display: grid;
	grid-template-areas:
		"icon text"
		"icon name"
		"icon rank";

	align-items: center;
	justify-content: start;
	column-gap: 0.5rem;

	$area-child: (
		"icon": 1,
		"text": 2,
		"name": 3,
		"rank": 4,
	);

	@each $area, $child-index in $area-child {
		> :nth-child(#{$child-index}) {
			grid-area: string.unquote($area);
			@if $area == "text" or $area == "rank" {
				font-size: 0.8rem;
			}
		}
	}
}

h2,
.date {
	color: var(--colour-accent);
	margin: 0;
}
</style>
