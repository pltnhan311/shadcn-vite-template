"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Row } from "@tanstack/react-table"
import { MoreHorizontal, PenSquare, Trash2 } from "lucide-react"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { CreateCabinForm } from "@/features/cabins/CreateCabinForm"
import IconMenu from "@/components/icon-menu"
import { Cabin } from "@/features/cabins/columns"

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps<Cabin>) {
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const cabinId = row.original.id

	return (
		<>
			<ResponsiveDialog
				isOpen={isEditOpen}
				setIsOpen={setIsEditOpen}
				title="Edit Cabin"
			>
				<CreateCabinForm
					cabin={row.original}
					cabinId={cabinId}
					setIsOpen={setIsEditOpen}
				/>
			</ResponsiveDialog>
			<ResponsiveDialog
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				title="Delete Person"
				description="Are you sure you want to delete this person?"
			>
				<CreateCabinForm
					cabin={row.original}
					cabinId={cabinId}
					setIsOpen={setIsEditOpen}
				/>
			</ResponsiveDialog>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="z-50 w-[160px]">
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
					<DropdownMenuSeparator />
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
