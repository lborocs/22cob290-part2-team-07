<script setup lang="ts">
import {
	has,
	Permission,
	permissionInfo,
	PermissionState,
} from "@/types/permission"
import { Icon } from "@iconify/vue"

const props = defineProps<{
	allow: Permission
	deny: Permission
	mask: Permission
}>()

const emit = defineEmits<{
	(e: "update:allow", value: Permission): void
	(e: "update:deny", value: Permission): void
}>()

const info = $computed(() => permissionInfo(props.mask))

const state = $computed(() =>
	has(props.allow, props.mask)
		? PermissionState.ALLOW
		: has(props.deny, props.mask)
		? PermissionState.DENY
		: PermissionState.NEUTRAL,
)

function edit(state: PermissionState) {
	let deny = props.deny & ~props.mask
	let allow = props.allow & ~props.mask

	switch (state) {
		case PermissionState.ALLOW:
			allow |= props.mask
			break
		case PermissionState.DENY:
			deny |= props.mask
			break
		default:
			break
	}

	if (allow !== props.allow) emit("update:allow", allow)
	if (deny !== props.deny) emit("update:deny", deny)
}
</script>

<template>
	<div class="container">
		<div class="head">
			<h3>{{ info?.name }}</h3>
			<ClientOnly>
				<div class="boxes" :data-permission-state="state">
					<button
						class="content-button deny"
						@click="edit(PermissionState.DENY)"
					>
						<Icon icon="material-symbols:cancel-outline-rounded" />
					</button>
					<button
						class="content-button neutral"
						@click="edit(PermissionState.NEUTRAL)"
					>
						<Icon icon="material-symbols:lens-outline" />
					</button>
					<button
						class="content-button allow"
						@click="edit(PermissionState.ALLOW)"
					>
						<Icon icon="material-symbols:check-circle-outline-rounded" />
					</button>
				</div>
			</ClientOnly>
		</div>
		<span>{{ info.desc }}</span>
	</div>
</template>

<style scoped lang="scss">
@use "@/assets/core";
@use "@/assets/animation";

div.container {
	background-color: var(--colour-background-2);
	border-radius: 1rem;
	padding: 1rem;
	padding-top: 0;
	margin-bottom: 1em;
}

.head {
	@extend %flex-space;
}

$permission-state-colours: (
	"deny": "red",
	"neutral": "amber",
	"allow": "green",
);
@each $name, $colour in $permission-state-colours {
	%data-permission-state-#{$name} {
		--colour-permission-state: var(--colour-#{$colour});
	}
}

.boxes {
	@extend %flex-row, %flex-centre;
	align-items: flex-end;

	background-color: var(--colour-background-3);
	padding: 0.25rem;
	border-radius: 1rem;

	> * {
		font-size: 2em;
		margin-left: 0.5rem;

		--colour-permission-highlight: var(--colour-permission-state);
		border: 3px solid transparent;
		border-radius: 25%;
		transition: {
			property: border-color, background-color;
			duration: animation.$transition-short;
			timing-function: ease-in-out;
		}

		&:hover {
			border-color: var(--colour-permission-highlight);
		}
	}
	@each $name, $colour in $permission-state-colours {
		.#{$name} {
			@extend %data-permission-state-#{$name};
		}
		&[data-permission-state="#{$name}"] .#{$name} {
			--colour-permission-highlight: var(--colour-text);
			background-color: var(--colour-permission-state);
		}
	}
}
</style>
