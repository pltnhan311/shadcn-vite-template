"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Edit, MoreVertical, Pen, PenBox, Pencil, PenLine, PenSquare, PenTool, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cabin = {
	id: string
	name: string
	capacity: number
	discount: number
	regularPrice: number
	image: string
}

export const columns: ColumnDef<Cabin>[] = [
	{
		accessorKey: "image",
		header: "",
		cell: ({ getValue }) => {
			const value = getValue<string>()
			return <img src={value} alt="Cabin image" className="h-20 w-28" />
		},
	},
	{
		accessorKey: "name",
		header: "CABIN",
	},
	{
		accessorKey: "maxCapacity",
		header: "CAPACITY",
		cell: ({ getValue }) => {
			const value = getValue<number>()
			return `Fits up to ${value} guests`
		},
	},
	{
		accessorKey: "regularPrice",
		header: "PRICE",
		cell: ({ getValue }) => {
			const value = getValue<number>()
			return `$${value}`
		},
	},
	{
		accessorKey: "discount",
		header: "DISCOUNT",
		cell: ({ getValue }) => {
			const value = getValue<number>()
			return `$${value}`
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const cabin = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="space-y-1">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(cabin.id)}
						>
							Copy ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Pencil className="mr-2 h-4 w-4" />
							<span>Edit</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Trash className="mr-2 h-4 w-4" />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
