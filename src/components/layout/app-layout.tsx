import { Sidebar } from "@/components/sidebar"
import { SiteHeader } from "@/components/site-header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
	return (
		<div className="grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
			<SiteHeader />
			<Sidebar />
			<main className="overflow-auto p-10">
				<div className="mx-auto my-0 flex flex-col gap-5">
					<Outlet />
				</div>
			</main>
		</div>
	)
}

export default AppLayout
