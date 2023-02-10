<!-- <script>
		uploadPhoto(e) {
			this.$emit("input", e.target.files[0])
			let reader = new FileReader()
			reader.readAsDataURL(e.target.files[0])
			reader.onload = e => {
				this.src = e.target.result
				console.log(this.src)
			}
</script> -->
<script setup lang="ts">
import { profilePicture, emailDomain } from "@/types/user"
import { User } from ".prisma/client"
const currentUsername = useCurrentUser().value!.name
// const currentUserRank = rankTitle()
const currentUserProfilePicture = ref(profilePicture(currentUsername))
const userEmail = useCurrentUser().value!.email + emailDomain
defineProps<{}>()
</script>

<template>
	<div class="card flex-col centre">
		<div class="card-title-wrapper">
			<h2 name="name" class="edit__titles">{{ currentUsername }}</h2>
			<h2 name="account" class="edit__titles">Account</h2>
		</div>
		<hr />
		<div class="card-image-wrapper">
			<h2 name="hierarchy" class="user__rank">{{ currentUserRank }}</h2>
			<img
				id="card-profile-picture"
				:src="currentUserProfilePicture"
				alt=""
				class="profile-pic"
			/>
			<slot name="button"></slot>
		</div>
		<div class="card-customisation-wrapper">
			<div class="wrapper-appearance">
				<hr class="solid" />
				<h1 class="bold-title">Appearance</h1>
				<label for="theme" class="label-subtext"
					>Customize how Make-It-All looks on your device</label
				>
				<select name="theme" class="theme">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</div>
			<div class="wrapper-password">
				<hr class="solid" />
				<h1 class="bold-title">Password</h1>
				<label for="change-password-btn" class="label-subtext"
					>Change your password to a more memorable one</label
				>
				<slot name="password"></slot>
			</div>
			<div class="wrapper-email">
				<hr class="solid" />
				<h1 class="bold-title">My Email</h1>
				<label for="email-box" class="label-subtext"
					>This is your assigned company email</label
				>
				<label id="email-box"> {{ userEmail }}</label>
				<img class="email-lock-img" src="~/assets/lock.png" alt="lock" />
			</div>
			<div class="wrapper-invite">
				<hr class="solid" />
				<h1 class="bold-title">Invite Others</h1>
				<label for="invite-btn" class="label-subtext"
					>Invite your co-workers who have not yet signed up</label
				>
				<slot name="invite"></slot>
			</div>
			<div class="wrapper-logout">
				<hr />
				<slot name="logout"></slot>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

$logout: #da0000;

@media (prefers-color-scheme: dark) {
	.modal {
		color: black;
	}
}

.modal {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 10;
}

.edit__titles {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}
.hidden {
	display: none;
}
.align {
	display: flex;
	align-items: center;
	justify-content: center;
}
.card-title-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.user__rank {
	text-align: center;
	font-style: normal;
	font-weight: 800;
	font-size: 1.5rem;
	line-height: 2em;
	letter-spacing: 0.01em;
	color: colour.$text-light-faded;
}
.card-image-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 2rem;
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
.card-button-wrapper {
	padding-top: 1rem;
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
	border-radius: 0.438rem;
}

.bold-title {
	font-size: x-large;
}

.label-subtext {
	color: colour.$text-light-faded;
	font-size: 1rem;
	line-height: 0.1rem;
}

.theme {
	border: none;
	float: right;
	padding: 0.5rem;
	border-radius: 1rem;
}
.wrapper-appearance,
.wrapper-password,
.wrapper-email,
.wrapper-invite {
	padding-bottom: 1rem;
}

#change-password-btn,
#invite-btn {
	width: fit-content;
	height: 2rem;
	cursor: pointer;
	text-align: center;
	display: flex;
	align-items: center;
	float: right;
	background: colour.$accent;
	border-radius: 0.438rem;
}
.upload-button {
	margin-top: 1.2rem;
	width: fit-content;
	border-radius: 0.5rem;
	height: 2.5em;
	background: colour.$accent;
	cursor: pointer;
}

.logout-button {
	margin-top: 1.2rem;
	width: fit-content;
	border-radius: 0.5rem;
	height: 2.5em;
	background: $logout;
	cursor: pointer;
}

.spacing:not(:last-child) {
	margin-right: 1rem;
}

#email-box {
	background-color: colour.$mid-grey;
	width: fit-content;
	height: 2rem;
	text-align: center;
	border-radius: 0.5rem;
	font-size: 1rem;
	float: right;
	padding-right: 1rem;
	padding-left: 1rem;
	display: flex;
	align-items: center;
}

.email-lock-img {
	float: right;
	padding-right: 1rem;
	padding-top: 0.5rem;
}

.logout-btn {
	width: fit-content;
	height: 2rem;
	text-align: center;
	display: flex;
	align-items: center;
	margin: auto;
	cursor: pointer;
	background: $logout;
	border-radius: 0.438rem;
	margin-top: 1rem;
}
</style>
