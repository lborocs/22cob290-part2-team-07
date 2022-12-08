<script setup lang="ts"></script>

<template>
	<article>
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

	> .body {
		padding: core.$card-padding-hori;
		padding: {
			top: 0.1rem;
			bottom: 0.1rem;
		}
	}

	%shared {
		background-color: var(--colour-accent-faded);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		justify-items: stretch;
		align-items: center;

		padding: core.$card-padding-vert / 2 core.$card-padding-hori / 2;

		.title {
			text-align: center;
		}
	}

	$radius: var(--card-radius);
	> .header {
		border-radius: $radius $radius 0 0;
		@extend %shared;
	}
	> .footer {
		border-radius: 0 0 $radius $radius;
		@extend %shared;
	}
}
</style>
