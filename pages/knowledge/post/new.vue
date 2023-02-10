<script setup lang="ts">
import { Post, Topic } from ".prisma/client"
import { has, Permission, permissions } from "~~/types/permission"

definePageMeta({
	name: "New Post",
})

interface PostCreate {
	title: string
	markdown: string
	topic?: Topic["uid"]
}

const post: PostCreate = reactive({
	title: "",
	markdown: "",
	topic: undefined,
})

const currentUser = useCurrentUser()
const preview = ref(false)
function togglePreview() {
	preview.value = !preview.value
}

const { data: topics } = useLazyFetch("/api/topics")

const btnCreate = ref<HTMLButtonElement>(null)

async function createTopic() {}
async function createPost(
	title: string,
	markdown: string,
	topic: Topic,
): Promise<Post["uid"] | undefined> {
	console.log("ALL THAT JAZZ", title, markdown, topic)

	const result = await $fetch("/api/post", {
		method: "POST",
		body: {
			title,
			markdown,
			topic: topic.uid,
			owner: currentUser.value!.uid,
		},
	})
	return result?.uid
}
async function upload() {
	try {
		btnCreate.value.disabled = true
		console.log("Uploading Post", post)

		const topic = topics.value!.find(topic => topic.uid === post.topic)
		console.log(topic)

		if (
			has(
				permissions(
					currentUser.value!.roles,
					topic?.overrideRoles,
					topic?.overrideUsers,
				),
				Permission.Post_Create,
			)
		) {
			const postUid = await createPost(post.title, post.markdown, topic!)
			if (postUid !== null) navigateTo(`/knowledge/post/${postUid}`)
			// TODO: Show error popup
		} else {
			// TODO: Show warning of permissions!
		}
	} finally {
		btnCreate.value.disabled = false
	}
}
</script>

<template>
	<form @submit.prevent="upload">
		<Sandwich>
			<template #header>
				<input
					type="text"
					name="title"
					placeholder="Title..."
					v-model="post.title"
					required
				/>
			</template>
			<template #header-control>
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
			</template>
			<template #footer>
				<select
					name="topic"
					required
					@change="post.topic = +($event.target as HTMLSelectElement).value"
				>
					<option value="">Select a Topic...</option>
					<option
						value=".create-new"
						v-if="has(permissions(currentUser!.roles), Permission.Topic_Create)"
					>
						New Topic...
					</option>
					<template v-for="topic in topics" :key="topic.uid">
						<option
							:value="topic.uid"
							v-if="
								has(
									permissions(
										currentUser!.roles,
										topic.overrideRoles,
										topic.overrideUsers,
									),
									Permission.Post_Read | Permission.Post_Create,
								)
							"
						>
							{{ topic.name }}
						</option>
					</template>
				</select>
			</template>
			<template #footer-control>
				<Button
					ref="btnCreate"
					type="submit"
					icon="material-symbols:upload-rounded"
					>Create</Button
				>
			</template>
			<template #default>
				<KnowledgePostMarkdown :markdown="post.markdown" v-if="preview" />
				<KnowledgePostEdit
					v-else
					:markdown="post.markdown"
					@update:markdown="post.markdown = $event"
				/>
			</template>
		</Sandwich>
	</form>
</template>

<style scoped lang="scss">
@use "~/assets/core";

select,
input {
	@extend %input;
	width: 40ch;
}
</style>
