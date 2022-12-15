export const useModal = () => {
	const exit = ref<any[]>([])
	const counter = ref(false)
	return {
		show: () => {
			counter.value = true
		},
		hide: (...args: any[]) => {
			exit.value = args
			counter.value = false
		},
		counter,
		exit,
	}
}

export type ModalControl = ReturnType<typeof useModal>
