import { DataTable } from "@/components/ui/data-table"
import { Cabin, columns } from "@/features/cabins/columns"

function CabinRow({ cabin }: { cabin: Cabin }) {
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={cabin} />
		</div>
	)
}
