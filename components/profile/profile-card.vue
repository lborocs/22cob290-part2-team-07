<script>
export default {
	data() {
		return {
			name: "Name", // need to make dynamic
			isShown: false,
			passIsShown: false,
			invIsShown: false,
			logout: false,
			src: "https://placekitten.com/150/150",
		}
	},
	methods: {
		toggleUpload() {
			this.isShown = !this.isShown
		},
		togglePassword() {
			this.passIsShown = !this.passIsShown
		},
		toggleInv() {
			this.invIsShown = !this.invIsShown
		},
		toggleLogout() {
			this.logout = !this.logout
		},
		uploadPhoto(e) {
			this.$emit("input", e.target.files[0])
			let reader = new FileReader()
			reader.readAsDataURL(e.target.files[0])
			reader.onload = e => {
				this.src = e.target.result
				console.log(this.src)
			}
		},
		triggerFileInput() {
			this.$refs.fileInput.click()
		},
	},
	props: {
		value: File,
	},
}
</script>
<template>
	<div class="card flex-col centre">
		<div class="card-title-wrapper">
			<slot name="name"></slot>
			<slot name="account">Account</slot>
		</div>
		<hr />
		<div class="card-image-wrapper">
			<slot name="hierarchy">Employee</slot>
			<img id="card-profile-picture" :src="src" alt="" class="profile-pic" />
		</div>
		<Modal v-show="isShown" class="align">
			<template #close-btn>
				<div class="close-btn" @click="toggleUpload">&#10006;</div>
			</template>
			<template #popup-title>
				<h2>Upload Photo</h2>
			</template>
			<template #popup-text>
				<p>Upload a photo of your choice</p>
			</template>
			<template #popup-buttons>
				<input
					type="file"
					accept="image/*"
					ref="fileInput"
					@change="uploadPhoto"
					class="hidden"
				/>
				<button @click="triggerFileInput" class="upload-button spacing">
					Upload photo
				</button>
				<button class="upload-button spacing" @click="toggleUpload">
					Save
				</button>
			</template>
		</Modal>
		<div class="card-button-wrapper">
			<button @click="toggleUpload" id="card-upload-button">
				<p>Upload photo</p>
			</button>
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
				<button @click="togglePassword" id="change-password-btn">
					<p>Change Password</p>
				</button>
			</div>
			<Modal v-show="passIsShown" class="align">
				<template #close-btn>
					<div class="close-btn" @click="togglePassword">&#10006;</div>
				</template>
				<template #popup-title>
					<h2>Change Password</h2>
				</template>
				<template #popup-text>
					<p>Change your password to a more memorable one</p>
				</template>
				<template #popup-buttons>
					<button class="upload-button spacing">Change Password</button>
					<button class="upload-button spacing">Save</button>
				</template>
			</Modal>
			<div class="wrapper-email">
				<hr class="solid" />
				<h1 class="bold-title">My Email</h1>
				<label for="email-box" class="label-subtext"
					>This is your assigned company email</label
				>
				<label id="email-box">f.batmaz@lboro.ac.uk</label>
				<img class="email-lock-img" src="~/assets/lock.png" alt="lock" />
			</div>
			<div class="wrapper-invite">
				<hr class="solid" />
				<h1 class="bold-title">Invite Others</h1>
				<label for="invite-btn" class="label-subtext"
					>Invite your co-workers who have not yet signed up</label
				>
				<button @click="toggleInv" id="invite-btn">
					<p>Invite</p>
				</button>
			</div>
			<Modal v-show="invIsShown" class="align">
				<template #close-btn>
					<div class="close-btn" @click="toggleInv">&#10006;</div>
				</template>
				<template #popup-title>
					<h2>Invite User</h2>
				</template>
				<template #popup-text>
					<p>Invite a colleague to the Make-It-All Portal</p>
				</template>
				<template #popup-buttons>
					<button class="upload-button">Invite</button>
				</template>
			</Modal>
			<div class="wrapper-logout">
				<hr />
				<button @click="toggleLogout" class="logout-btn" id="logout">
					<p>Logout</p>
				</button>
			</div>
			<Modal v-show="logout" class="align">
				<template #close-btn>
					<div class="close-btn" @click="toggleLogout">&#10006;</div>
				</template>
				<template #popup-title>
					<h2>Logout</h2>
				</template>
				<template #popup-text>
					<p>Are you sure you want to logout?</p>
				</template>
				<template #popup-buttons>
					<button class="logout-button">Logout</button>
				</template>
			</Modal>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

$logout: #da0000;

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

.close-btn {
	float: right;
	cursor: pointer;
}
</style>
