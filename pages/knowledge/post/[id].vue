<script setup lang="ts">
import { rankTitle } from "@/types/user"

definePageMeta({
	name: "Knowledge Post",
})

const route = useRoute()
const { data: post } = await useFetch(`/api/post/${route.params.id}`)

// If the current user has access to edit the post
const editor = true
const editing = $computed(() => route.path.endsWith("edit"))
let preview = $ref(false)

function togglePreview() {
	preview = !preview
}
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
			<div class="control" v-if="!editing">
				<ButtonNuxt
					icon="material-symbols:topic-outline-rounded"
					:to="`/knowledge/search/?topic=${post.topic.uid}`"
					>{{ post.topic.name }}</ButtonNuxt
				>
			</div>
			<div class="control" v-else-if="editor && editing">
				<Button
					v-if="preview"
					icon="material-symbols:edit-outline-rounded"
					@click="togglePreview()"
				>
					Edit
				</Button>
				<Button
					v-else
					icon="material-symbols:visibility-outline-rounded"
					@click="togglePreview()"
				>
					Preview
				</Button>
			</div>
		</template>
		<slot />
		<template #footer-extra
			><div class="control" v-if="editing">
				<Button icon="material-symbols:key-outline-rounded">Key</Button>
			</div></template
		>
		<template #footer><Date class="date" :date="post.created" /></template>
		<template #footer-control>
			<div class="control" v-if="editor && !editing">
				<ButtonNuxt
					icon="material-symbols:edit-outline-rounded"
					:to="`/knowledge/post/${post.uid}/edit`"
					@click="preview = false"
					>Edit</ButtonNuxt
				>
			</div>
			<div class="control" v-else-if="editing">
				<ButtonNuxt
					icon="material-symbols:cancel-outline-rounded"
					:to="`/knowledge/post/${post.uid}`"
					>Cancel</ButtonNuxt
				><ButtonNuxt
					v-if="editor"
					icon="material-symbols:save-outline-rounded"
					:to="`/knowledge/post/${post.uid}`"
					>Save</ButtonNuxt
				>
			</div>
		</template>
		<KnowledgePostMarkdown
			v-if="!editing || (editing && preview)"
			:markdown="post.markdown"
			:header-level="3"
		/>
		<KnowledgePostEdit :post="post" v-else />
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
