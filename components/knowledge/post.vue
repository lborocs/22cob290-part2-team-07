<script setup lang="ts">
import { rolesTitle } from "@/types/user"
import { has, Permission, permissions } from "@/types/permission"

const { post } = defineProps<{
	post: PostR
}>()
const route = useRoute()
const currentUserPermissions = useCurrentUserPermissions()

const userPermissions = $computed(() =>
	permissions(
		permissions(
			currentUserPermissions,
			post.topic.overrideRoles,
			post.topic.overrideUsers,
		),
		post.overrideRoles,
		post.overrideUsers,
	),
)

let markdownLocal = ref(post.markdown)
watchEffect(() => {
	markdownLocal.value = post.markdown
})

// If the current user has access to edit the post
const editor = $computed(() =>
	has(userPermissions, Permission.Post_Read | Permission.Post_Edit),
)
const editing = $computed(() => route.path.endsWith("edit"))

let preview = $ref(false)

function togglePreview() {
	preview = !preview
}

function saveEdit() {
	post.markdown = markdownLocal.value.trim()
	if (has(userPermissions, Permission.Post_Read | Permission.Post_Edit)) {
		uploadChanges()
	}
}

async function uploadChanges() {
	await $fetch(`/api/post/${post.uid}`, {
		method: "PUT",
		body: {
			markdown: post.markdown,
		},
		// TODO: Assets references maybe
	})
}
</script>

<template>
	<Sandwich>
		<template #header-extra>
			<div class="owner">
				<UserIcon class="icon" v-bind="post.owner" :size="50" />
				<span>Posted By</span>
				<UserName v-bind="post.owner" />
				<span>{{ rolesTitle(post.owner.roles) }}</span>
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

		<template #footer><Date class="date" :date="post.createdAt" /></template>
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
					@click="markdownLocal = post.markdown"
					>Cancel</ButtonNuxt
				><ButtonNuxt
					v-if="editor"
					icon="material-symbols:save-outline-rounded"
					:to="`/knowledge/post/${post.uid}`"
					@click="saveEdit"
					>Save</ButtonNuxt
				>
			</div>
		</template>
		<template #footer-extra>
			<ButtonNuxt
				icon="material-symbols:gavel-rounded"
				:to="`/knowledge/post/${post.uid}/permission/`"
				v-if="
					has(
						permissions(currentUserPermissions),
						Permission.Permission_Override,
					)
				"
				>Permissions</ButtonNuxt
			>
		</template>
		<KnowledgePostMarkdown
			v-if="!editing || (editing && preview)"
			:markdown="markdownLocal"
			:header-level="3"
		/>
		<KnowledgePostEdit
			:markdown="markdownLocal"
			@update:markdown="markdownLocal = $event"
			v-else
		/>
	</Sandwich>
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
