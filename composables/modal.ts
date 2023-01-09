export const useModal = () => {
	const exit = ref<any[]>([])
	const active = ref(false)
	return {
		show: () => {
			active.value = true
		},
		hide: (...args: any[]) => {
			exit.value = args
			active.value = false
		},
		active,
		exit,
	}
}

export type ModalControl = ReturnType<typeof useModal>
