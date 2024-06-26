import * as React from "react"
import { Button } from "@/components/ui/button"
import { CreateCabinForm } from "@/features/cabins/CreateCabinForm"
import { ResponsiveDialog } from "@/components/responsive-dialog"

export function AddCabin() {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<>
			<Button variant="primary" onClick={() => setIsOpen(true)}>
				Add new cabin
			</Button>
			<ResponsiveDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="Add New Cabin"
				description="Fill in the details to add a new cabin."
			>
				<CreateCabinForm setIsOpen={setIsOpen} />
			</ResponsiveDialog>
		</>
	)
}
