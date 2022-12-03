<script setup></script>

<template>
	<div class="card flex-col centre">
		<div class="card-title-wrapper">
			<slot name="name"></slot>
			<slot name="account">Account</slot>
		</div>
		<hr />
		<div class="card-image-wrapper">
			<slot name="hierarchy">Employee</slot>
			<img
				id="card-profile-picture"
				src="https://ui-avatars.com/api/?name=Neumann&background=random&size=50&format=svg"
				alt=""
				class="profile-pic"
			/>
		</div>
		<div class="card-button-wrapper">
			<button id="card-upload-button">
				<p>Upload photo</p>
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;
@use "/assets/colour";

.card-title-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.card-image-wrapper {
	text-align: center;
	font-style: normal;
	font-weight: 800;
	font-size: 1.5rem;
	line-height: 2em;
	letter-spacing: 0.01em;
	color: colour.$text-light-faded;
	display: flex;
	flex-direction: column;
	align-items: center;
}

#card-profile-picture {
	box-sizing: border-box;
	width: fit-content;
	height: 8rem;
	border: 1px solid colour.$accent;
	border-radius: 120vh;
}

.profile-pic {
	aspect-ratio: 1;
	border-radius: 50%;
	border: 2px colour.$text-light-faded solid;
}

#card-upload-button {
	width: fit-content;
	height: 2rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	cursor: pointer;
	background: colour.$accent;
	border-radius: 7px;
}
</style>
