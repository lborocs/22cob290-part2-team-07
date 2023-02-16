<script setup>
import { logout } from "@/types/user"

definePageMeta({
	name: "Profile",
})

const modalActive = ref(false)
const passModalActive = ref(false)
const invModalActive = ref(false)
const logModalActive = ref(false)
const preventScoll = () => {
	const body = document.getElementsByTagName("body")[0]
	if (modalActive) {
		body.style = "overflow-y: hidden;"
	}
}
const promoteScroll = () => {
	const body = document.getElementsByTagName("body")[0]
	body.style = "overflow-y: visible;"
}

function validateInv(event) {
	event.preventDefault()
	const email = document.getElementsByTagName("input")[0]
	if (email.value != "") {
		// Add logic for sending invite email here

		const check = document.getElementsByClassName("email__sent")[0]
		check.style.display = "block"
		email.value = ""
	}
}

function clearCheck() {
	const check = document.getElementsByClassName("email__sent")[0]
	check.style.display = "none"
}

function setLight() {
	console.log("setLight")
	const index = document.getElementsByClassName("theme")[0].selectedIndex
	const page = document.getElementsByTagName("html")[0]
	const modal = document.getElementsByClassName("modal")
	console.log(index)
	switch (index) {
		case 0:
			console.log("hello")
			break
		case 1:
			console.log("light")
			page.classList.remove("theme-dark")
			page.classList.add("theme-light")
			break
		case 2:
			console.log(modal)
			page.classList.remove("theme-light")
			page.classList.add("theme-dark")
			break
		default:
			console.log("nothing")
	}
}
</script>

<template>
	<p>The Edit Profile Page</p>
	<!-- <Moodal
		v-show="modalActive"
		@close=";(modalActive = !modalActive), promoteScroll()"
		class="align modal"
	>
		<template #content>
			<h2>Upload Photo</h2>
			<p>Upload a photo of your choice</p>
			<input
				type="file"
				accept="image/*"
				ref="fileInput"
				@change="uploadPhoto"
				class="hidden"
			/>
			<button @click="" class="upload-button spacing">Upload photo</button>
			<button class="upload-button spacing" @click="toggleUpload">Save</button>
		</template>
	</Moodal> -->
	<Moodal
		v-show="passModalActive"
		@close=";(passModalActive = !passModalActive), promoteScroll()"
		class="align modal"
	>
		<template #content>
			<h2>Change Password</h2>
			<p>Change your password to a more memorable one</p>

			<button class="upload-button spacing">Change Password</button>
			<button class="upload-button spacing">Save</button>
		</template>
	</Moodal>
	<Moodal
		v-show="invModalActive"
		@close=";(invModalActive = !invModalActive), promoteScroll(), clearCheck()"
		class="align modal"
	>
		<template #content>
			<h2>Invite User</h2>
			<p>Invite a colleague to the Make-It-All Portal</p>
			<div id="inv--wrapper">
				<input type="email" name="invite__email" id="inv--email" />
				<p class="email__sent">Sent &check;</p>
				<button class="upload-button" @click="validateInv">Invite</button>
			</div>
		</template>
	</Moodal>
	<Moodal
		v-show="logModalActive"
		@close=";(logModalActive = !logModalActive), promoteScroll()"
		class="align modal"
	>
		<template #content>
			<h2>Logout</h2>
			<p>Are you sure you want to logout?</p>
			<a href="/login">
				<button class="logout-button" @click="logout()">Logout</button></a
			>
		</template>
	</Moodal>

	<profile-card>
		<!-- <template #button>
			<div name="button" class="card-button-wrapper">
				<button
					name="button"
					@click=";(modalActive = true), preventScoll()"
					id="card-upload-button"
				>
					<p>Upload photo</p>
				</button>
			</div>
		</template> -->
		<template #theme>
			<select @change="setLight()" name="theme" class="theme">
				<option value="default">Default</option>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</select>
		</template>
		<template #password>
			<button
				@click=";(passModalActive = true), preventScoll()"
				id="change-password-btn"
			>
				<p>Change Password</p>
			</button>
		</template>
		<template #invite>
			<button @click=";(invModalActive = true), preventScoll()" id="invite-btn">
				<p>Invite</p>
			</button>
		</template>
		<template #logout>
			<button
				@click=";(logModalActive = true), preventScoll()"
				class="logout-btn"
				id="logout"
			>
				<p>Logout</p>
			</button>
		</template>
	</profile-card>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

$logout: #da0000;

#title-card {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}

.modal {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 10;
}

.backdrop {
	width: 100%;
	height: 100%;
	z-index: 9;
	max-height: 100vh;
	overflow-y: hidden;
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
	width: min-content;
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

#inv--wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

#inv--email {
	width: 80%;
	height: 2rem;
	border-radius: 10px;
	padding-left: 1rem;
	font-weight: bold;
	font-family: inherit;
}

.email__sent {
	font-weight: bold;
	display: none;
	margin-bottom: 0;
}
</style>
