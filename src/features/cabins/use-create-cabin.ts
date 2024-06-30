import { createEditCabin } from "@/services/apiCabins"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateCabin() {
	const queryClient = useQueryClient()

	const { mutate: createCabin, isPending: isCreating } = useMutation({
		// @ts-expect-error both
		mutationFn: createEditCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] })
		},
	})

	return { createCabin, isCreating }
}
