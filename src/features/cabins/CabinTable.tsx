import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/features/cabins/columns"
import { useCabins } from "@/features/cabins/use-cabins"

function CabinTable() {
	const { isLoading, cabins } = useCabins()
	console.log(cabins)
  return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={cabins || []} />
		</div>
	)
}

export default CabinTable
