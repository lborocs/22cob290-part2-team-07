export const useModal = () => {
	const counter = ref(false)
	return {
		show: () => {
			counter.value = true
		},
		hide: () => {
			counter.value = false
		},
		counter,
	}
}

export type ModalControl = ReturnType<typeof useModal>
