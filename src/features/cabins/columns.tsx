"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "@/features/cabins/data-table-row-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cabin = {
	id: number
	name: string
	maxCapacity: number
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
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
