<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Clients page",
})


import {ref } from 'vue'
import { useRoute } from 'vue-router'
import { User } from ".prisma/client"
import { profilePicture } from "~~/types/user"


const { params } = useRoute()
const clientId = params.id[0]
const { data: client } = await useFetch(`/api/client/${clientId}`)
console.log(client)
const clientRep = client.value!.representative
const clientEmail = client.value!.email
const clientPhone = client.value!.phone
const clientAddress = client.value!.address
const clientWebsite = client.value!.website

const repProfilePicture = ref(profilePicture(clientRep))




defineProps<{}>()





</script>
<template>


	<client-card>
		<template #client-details>
			<h2 id="title-card">Client details</h2>
		</template>
		<template #client-name>
			<h2 id="title-card">{{ clientRep }}</h2>
			<!-- use properties or moustache brackets instead on lots of slots-->
		</template>
		<template #contact-information>
			<h2 id="title-card">Email: {{clientEmail}} Phone: {{clientPhone}} Website: {{ clientWebsite }}</h2>
		</template>
	</client-card>

</template>


<style scoped lang="scss"></style>
