<script setup lang="ts">
import { rankTitle } from "@/types/user"

defineProps<{
	uid: number
	title: string
	preview: string

	owner: User
	topics: Topic[]
	created: DateNumber
}>()
</script>

<template>
	<article>
		<ButtonNuxt
			class="topic aside"
			:to="`/knowledge/search/?q=&topic=${topics[0].uid}`"
			icon="material-symbols:topic-outline-rounded"
			>{{ topics[0].name }}</ButtonNuxt
		>
		<div class="owner aside">
			<UserIcon v-bind="owner" :size="50" />
			<span>{{ rankTitle(owner.rank) }}</span>
		</div>
		<Date :date="created" class="date aside" />
		<h2>{{ title }}</h2>
		<div class="preview">{{ preview }}</div>
		<ButtonNuxt
			class="view"
			:to="`/knowledge/post/${uid}`"
			icon="material-symbols:visibility-outline-rounded"
			>View</ButtonNuxt
		>
	</article>
</template>

<style scoped lang="scss">
@use "~/assets/core";

article {
	@extend .card;
	margin-bottom: 1rem;
	display: grid;
	grid-template:
		"topic title" 1fr
		"owner body" auto
		"date view" 1fr / auto 1fr;
}

.aside {
	justify-self: center;
}

.topic {
	grid-area: topic;
}

.owner {
	grid-area: owner;
	@extend %flex-col, %flex-centre;
}

.date {
	grid-area: date;
	align-self: flex-end;
}

h2 {
	grid-area: title;
	margin: 0;
}

div.preview {
	margin-top: 0.1rem;
	padding-top: 0.1rem;
	border-top: 2px solid var(--colour-text);
	grid-area: body;
}

.preview {
	max-height: 10ch;
}

.view {
	margin-left: auto;
	grid-area: view;
	align-self: flex-end;
}
</style>
