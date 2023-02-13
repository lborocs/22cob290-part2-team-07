<script setup lang="ts">
import { has, Permission, permissions } from "@/types/permission"

const { data: currentUser } = await useCurrentUser()

const { data: topics } = useLazyFetch("/api/topics", {
	params: {
		u: currentUser.value?.uid,
	},
})
const topicSelector = ref<HTMLSelectElement>()

onMounted(() => {
	topicSelector.value!.value = (useRoute().query.topic as string) ?? ""
})
</script>

<template>
	<Form to="/knowledge/search/">
		<input
			name="q"
			type="search"
			placeholder="Search..."
			:value="$route.query.q"
		/>
		<select name="topic" ref="topicSelector" :value="$route.query.topic">
			<option value="">Any Topic</option>
			<template v-for="topic in topics" :key="topic.uid">
				<option
					v-if="has(permissions(currentUser!.roles, topic.overrideRoles, topic.overrideUsers), Permission.Post_Read)"
					:value="topic.uid"
				>
					{{ topic.name }}
				</option>
			</template>
		</select>
		<Button type="submit" icon="material-symbols:search-rounded">Search</Button>
		<ButtonNuxt to="/knowledge/post/new" icon="material-symbols:add"
			>Create Post</ButtonNuxt
		>
	</Form>
</template>

<style scoped lang="scss">
@use "~/assets/core";

form {
	@extend %flex-row, %flex-centre;
	width: 70%;
	> * {
		margin: {
			top: 0.25rem;
			bottom: 0.25rem;
		}
	}
}

input {
	@extend %input;
	--input-background: var(--colour-background-2);
	border: none;
	padding: 0.75rem;
	width: 80%;
	box-shadow: var(--card-shadow);
	font-size: inherit;
}

select {
	@extend %input;
	font-size: inherit;
	--input-background: var(--colour-background-2);
	width: fit-content;
	max-width: 15ch;
	/* added this as it stops large topic names going off screen */
	margin: 0.5rem;
	cursor: pointer;
}
</style>
