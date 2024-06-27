import { Button } from "@/components/ui/button"
import { CreateCabinForm } from "@/features/cabins/CreateCabinForm"
import { CustomDialog } from "@/components/custom-dialog"
import { useState } from "react"

export function AddCabin() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button variant="primary" onClick={() => setIsOpen(true)}>
				Add new cabin
			</Button>
			<CustomDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="Add New Cabin"
				description="Fill in the details to add a new cabin."
			>
				<CreateCabinForm setIsOpen={setIsOpen} />
			</CustomDialog>
		</>
	)
}
