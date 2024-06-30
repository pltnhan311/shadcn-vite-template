import { deleteCabin as deleteCabinApi } from "@/services/apiCabins"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export function useDeleteCabin() {
	const queryClient = useQueryClient()

	const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] })
			toast.success("Cabin successfully deleted")
		},
		onError: (err) => toast.error(err.message),
	})

	return { deleteCabin, isDeleting }
}
