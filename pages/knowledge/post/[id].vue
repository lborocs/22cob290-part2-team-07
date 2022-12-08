<script setup lang="ts">
import { rankTitle } from "@/types/user"

definePageMeta({
	name: "Post Name",
})

const route = useRoute()
const { data: post } = await useFetch(`/api/post/${route.params.id}`)

// If the current user has access to edit the post
const editor = true
const isEditing = $computed(() => route.path.endsWith("edit"))
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
		<template #header-control>
			<div class="control">
				<ButtonNuxt
					v-if="editor && !isEditing"
					icon="material-symbols:topic-outline-rounded"
					:to="`/knowledge/search/?topic=${post.topic.uid}`"
					>{{ post.topic.name }}</ButtonNuxt
				>
			</div>
		</template>
		<slot />
		<template #footer><Date class="date" :date="post.created" /></template>
		<template #footer-control>
			<div class="control" v-if="editor && !isEditing">
				<ButtonNuxt
					icon="material-symbols:edit-outline-rounded"
					:to="`/knowledge/post/${post.uid}/edit`"
					>Edit</ButtonNuxt
				>
			</div>
			<div class="control" v-if="editor && isEditing">
				<ButtonNuxt
					icon="material-symbols:cancel-outline-rounded"
					:to="`/knowledge/post/${post.uid}`"
					>Cancel</ButtonNuxt
				><ButtonNuxt
					icon="material-symbols:save-outline-rounded"
					:to="`/knowledge/post/${post.uid}`"
					>Save</ButtonNuxt
				>
			</div>
		</template>
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

.control {
	display: flex;
}
</style>
