<script setup lang="ts">
import { rankTitle } from "@/types/user"

defineProps<{
	uid: number
	title: string
	markdown: string

	owner: User
	topic: Topic
	created: DateNumber
}>()
</script>

<template>
	<article>
		<ButtonNuxt
			class="topic"
			:to="`/knowledge/search/?q=&topic=${topic.uid}`"
			icon="material-symbols:topic-outline-rounded"
			>{{ topic.name }}</ButtonNuxt
		>
		<div class="owner">
			<UserIcon :uid="owner.uid" :name="owner.name" :size="50" />
			<UserName :uid="owner.uid" :name="owner.name" />
			<span>{{ rankTitle(owner.rank) }}</span>
		</div>
		<Date :date="created" class="date" />
		<h2>{{ title }}</h2>
		<KnowledgePostMarkdown
			class="preview"
			:markdown="markdown"
			:header-level="3"
		/>
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
	@extend %card;
	padding: 0;
	margin-bottom: 1rem;
	display: grid;
	column-gap: 0.5rem;
	grid-template:
		"topic title" 1fr
		"owner body" max-content
		"date view" 1fr
		/ 11rem 1fr 0.5rem;
}

%aside {
	justify-self: center;
	margin: 0;
	padding: 0.5rem 1rem;
	text-align: center;
	width: 100%;
	height: 100%;

	&-start {
		@extend %aside;
		border-radius: var(--card-radius) 0 0 0;
	}
	&-body {
		background-color: var(--colour-background-3);
	}
	&-end {
		@extend %aside;
		border-radius: 0 0 0 var(--card-radius);
		background-color: var(--colour-background-3);
	}
}

.topic {
	grid-area: topic;
	@extend %aside-start;
}

.owner {
	grid-area: owner;
	padding: 1rem 0;
	@extend %aside-body, %flex-col, %flex-centre;
}

.date {
	grid-area: date;
	@extend %aside-end;
	align-self: flex-end;
}

h2 {
	grid-area: title;
	margin: auto 0;
}

div.preview {
	margin-top: 0.1rem;
	padding-top: 0.1rem;
	border-top: 2px solid var(--colour-text);
	grid-area: body;
	overflow: hidden;
	max-height: 10em;
}

.view {
	margin: 0.5rem;
	margin-left: auto;
	grid-area: view;
	align-self: flex-end;
}
</style>

<!-- Preview -->
<style lang="scss">
article div.preview {
	> * {
		margin: 0.25em 0;
	}
	@for $i from 3 through 6 {
		h#{$i} {
			margin: 0.45em 0;
		}
	}
}
</style>
