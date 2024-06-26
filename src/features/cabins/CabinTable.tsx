import { DataTable } from "@/components/ui/data-table"
import { AddCabin } from "@/features/cabins/AddCabin"
import { columns } from "@/features/cabins/columns"
import { useCabins } from "@/features/cabins/use-cabins"

function CabinTable() {
	const { isLoading, cabins } = useCabins()

	return (
		<div className="container mx-auto space-y-7 py-5">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">All cabins</h1>
				<AddCabin />
			</div>
			<DataTable columns={columns} data={cabins || []} isLoading={isLoading} />
		</div>
	)
}

export default CabinTable
