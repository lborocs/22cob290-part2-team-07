<script setup lang="ts">
import { Post, Topic } from ".prisma/client"
import { has, Permission, permissions } from "~~/types/permission"

definePageMeta({
	name: "New Post",
})

interface PostCreate {
	title: string
	markdown: string
	topic?: string
}
interface TopicCreate {
	name: string
}

const post: PostCreate = reactive({
	title: "",
	markdown: "",
	topic: undefined,
})
const modalTopicInfo: TopicCreate = reactive({
	name: "",
})

const { data: currentUser } = await useCurrentUser()
const preview = ref(false)
function togglePreview() {
	preview.value = !preview.value
}
const modalTopic = useModal()
const modalTopicResolver = ref<(value: TopicCreate | undefined) => void>()

const { data: topics } = useLazyFetch("/api/topics")
const TOPIC_CREATE_NEW = ".create-new"

const btnCreate = ref<HTMLButtonElement>(null)

async function createTopic(info: TopicCreate) {
	const result = await $fetch("/api/topic", {
		method: "POST",
		body: {
			name: info.name,
			u: currentUser.value!.uid,
		},
	})
	return result
}
async function createPost(
	title: string,
	markdown: string,
	topic: Topic,
): Promise<Post["uid"] | undefined> {
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

function modalTopicResolve(submit: TopicCreate | undefined) {
	if (modalTopicResolver.value !== undefined) {
		const resolver = modalTopicResolver.value
		modalTopicResolver.value = undefined
		resolver(submit)
	}
}
async function makeTopic() {
	try {
		const promise = new Promise<TopicCreate | undefined>(resolve => {
			modalTopicResolver.value = resolve
		})
		modalTopic.show()
		const result = await promise
		if (result === undefined) return undefined
		return await createTopic(result)
	} finally {
		modalTopic.hide()
	}
	return undefined
}

async function upload() {
	try {
		btnCreate.value.disabled = true

		let topic = undefined
		if (post.topic == TOPIC_CREATE_NEW) {
			topic = await makeTopic()
			if (topic === undefined) return
		} else {
			topic = topics.value!.find(topic => topic.uid === +(post.topic ?? "-1"))
		}

		if (topic === undefined) {
			// TODO: Error popup
			return
		}

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
					@change="post.topic = ($event.target as HTMLSelectElement).value"
				>
					<option value="">Select a Topic...</option>
					<option
						:value="TOPIC_CREATE_NEW"
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
			<!-- TODO -->
			<template #footer-extra> BUTTON TO HIDE BY DEFAULT </template>
		</Sandwich>
	</form>
	<Modal
		:control="modalTopic"
		title="Create a Topic"
		@close="modalTopicResolve($event)"
	>
		<form @submit.prevent="modalTopic.hide(modalTopicInfo)">
			<input
				type="text"
				placeholder="Topic Name..."
				v-model="modalTopicInfo.name"
				required
			/>
			<ModalFooter>
				<Button
					icon="material-symbols:create-new-folder-outline-rounded"
					type="submit"
					>Create</Button
				>
			</ModalFooter>
		</form>
	</Modal>
</template>

<style scoped lang="scss">
@use "~/assets/core";

select,
input {
	@extend %input;
	width: 40ch;
}
</style>
