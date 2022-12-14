<script setup lang="ts"></script>

<template>
	<article class="sandwich">
		<div class="header">
			<div class="extra"><slot name="header-extra" /></div>
			<div class="title"><slot name="header" /></div>
			<div class="cntrl"><slot name="header-control" /></div>
		</div>
		<div class="body">
			<slot />
		</div>
		<div class="footer">
			<div class="extra"><slot name="footer-extra" /></div>
			<div class="title"><slot name="footer" /></div>
			<div class="cntrl"><slot name="footer-control" /></div>
		</div>
	</article>
</template>

<style scoped lang="scss">
@use "~/assets/core";

article {
	@extend %card;
	padding: 0;

	--sandwich-bread-background-colour: var(--colour-accent-faded);
	--sandwich-butter-background-colour: initial;
	--sandwich-border: none;

	> .body {
		padding: core.$card-padding-hori;
		padding: {
			top: 0.1rem;
			bottom: 0.1rem;
		}
		background-color: var(--sandwich-butter-background-colour);
	}
	> * {
		border: {
			left: var(--sandwich-border);
			right: var(--sandwich-border);
		}
	}

	%shared {
		background-color: var(--sandwich-bread-background-colour);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		column-gap: 0.5rem;
		justify-items: stretch;
		align-items: center;

		padding: calc(core.$card-padding-vert / 2) calc(core.$card-padding-hori / 2);

		.extra {
			justify-self: start;
		}
		.title {
			justify-self: center;
			text-align: center;
		}
		.cntrl {
			justify-self: end;
		}
	}

	$radius: var(--card-radius);
	> .header {
		border-radius: $radius $radius 0 0;
		border-top: var(--sandwich-border);
		@extend %shared;
	}
	> .footer {
		border-radius: 0 0 $radius $radius;
		border-bottom: var(--sandwich-border);
		@extend %shared;
	}
}
</style>
