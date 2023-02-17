export const useKanbanPreference = defineStore(
	"KanbanPreference",
	() => {
		const preference = ref(2)
		return { preference }
	},
	{
		persist: {
			storage: persistedState.cookies,
		},
	},
)
