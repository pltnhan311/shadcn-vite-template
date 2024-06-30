import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useDeleteCabin } from "@/features/cabins/use-delete-cabin"
import { Loader2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

export default function DeleteForm({
	cabinId,
	setIsOpen,
}: {
	cabinId: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
	const form = useForm()

	const isLoading = form.formState.isSubmitting

	const { deleteCabin, isDeleting } = useDeleteCabin()

	const onSumit = async () => {
		try {
			deleteCabin(cabinId, {
				onSuccess: () => setIsOpen(false),
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSumit)}
				className="space-y-6 px-4 sm:px-0"
			>
				<div className="mt-5 flex w-full justify-center sm:space-x-6">
					<Button
						size="default"
						variant="outline"
						disabled={isLoading}
						className="hidden w-full sm:block"
						type="button"
						onClick={() => setIsOpen(false)}
					>
						Cancel
					</Button>
					<Button
						size="default"
						type="submit"
						disabled={isDeleting}
						className="w-full bg-red-500 hover:bg-red-500/80"
					>
						{isDeleting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting
							</>
						) : (
							<span>Delete</span>
						)}
					</Button>
				</div>
			</form>
		</Form>
	)
}
