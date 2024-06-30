"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "@/features/cabins/data-table-row-actions"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cabin = {
	id: number
	name: string
	maxCapacity: number
	discount: number
	regularPrice: number
	image: string
	description: string
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
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					CABIN
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			)
		},
	},
	{
		accessorKey: "maxCapacity",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					CAPACITY
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			const value = getValue<number>()
			return `Fits up to ${value} guests`
		},
	},
	{
		accessorKey: "regularPrice",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					PRICE
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			const value = getValue<number>()
			return `$${value}`
		},
	},
	{
		accessorKey: "discount",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					DISCOUNT
					<ArrowUpDown className="ml-2 h-3 w-3" />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			const value = getValue<number>()
			return `$${value}`
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
