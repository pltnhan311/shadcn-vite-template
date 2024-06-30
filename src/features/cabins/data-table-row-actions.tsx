"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Row } from "@tanstack/react-table"
import { Copy, MoreVertical, PenSquare, Trash2 } from "lucide-react"
import { CustomDialog } from "@/components/custom-dialog"
import { CreateCabinForm } from "@/features/cabins/CreateCabinForm"
import IconMenu from "@/components/icon-menu"
import { Cabin } from "@/features/cabins/columns"
import DeleteForm from "@/features/cabins/DeleteForm"
import { useCreateCabin } from "@/features/cabins/use-create-cabin"
import toast from "react-hot-toast"

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps<Cabin>) {
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const { isCreating, createCabin } = useCreateCabin()

	const cabin = row.original

	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin

	const handleDuplicateCabin = () => {
		createCabin(
			{
				name: `Copy of ${name}`,
				maxCapacity,
				regularPrice,
				discount,
				image,
				description,
			},
			{
				onSuccess: () => {
					toast.success("Duplicated cabin successful")
				},
				onError: (err) => {
					toast.error(err.message)
				},
			},
		)
	}

	return (
		<>
			<CustomDialog
				isOpen={isEditOpen}
				setIsOpen={setIsEditOpen}
				title="Edit Cabin"
			>
				<CreateCabinForm
					cabin={row.original}
					cabinId={cabinId}
					setIsOpen={setIsEditOpen}
				/>
			</CustomDialog>

			<CustomDialog
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				title="Delete Cabin"
				description="Are you sure you want to delete this cabin?"
			>
				<DeleteForm cabinId={cabinId} setIsOpen={setIsDeleteOpen} />
			</CustomDialog>

			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="z-50 w-[120px]">
					<DropdownMenuItem className="group flex w-full items-center justify-between p-0 text-left text-sm">
						<button
							className="flex w-full justify-start rounded-md p-2 text-green-500 transition-all duration-75"
							onClick={handleDuplicateCabin}
							disabled={isCreating}
						>
							<IconMenu text="Duplicate" icon={<Copy className="h-4 w-4" />} />
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem className="group flex w-full items-center justify-between p-0 text-left text-sm">
						<button
							onClick={() => {
								setIsEditOpen(true)
							}}
							className="flex w-full justify-start rounded-md p-2 text-blue-500 transition-all duration-75"
						>
							<IconMenu text="Edit" icon={<PenSquare className="h-4 w-4" />} />
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem className="group flex w-full items-center justify-between p-0 text-left text-sm text-neutral-500 ">
						<button
							onClick={() => {
								setIsDeleteOpen(true)
							}}
							className="flex w-full justify-start rounded-md p-2 text-red-400 transition-all duration-75"
						>
							<IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
