import AppLayout from "@/components/layout/app-layout"
import Account from "@/pages/Account"
import Bookings from "@/pages/Bookings"
import Cabins from "@/pages/Cabins"
import Dashboard from "@/pages/Dashboard"
import PageNotFound from "@/pages/PageNotFound"
import Settings from "@/pages/Settings"
import Users from "@/pages/Users"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// staleTime: 60 * 1000,
				staleTime: 0,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<Users />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
