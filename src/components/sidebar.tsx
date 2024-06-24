"use client"

import { Link } from "react-router-dom"
import {
	BookIcon,
	BoxIcon,
	HomeIcon,
	LockIcon,
	Settings,
	User,
} from "lucide-react"

export function Sidebar() {
	return (
		<div className="row-span-full flex gap-8 border-r border-gray-800 pt-5">
			<ul className="mt-24 flex w-full flex-col gap-y-3">
				<NavLink to="/" icon={<BoxIcon />}>
					Home
				</NavLink>
				<NavLink to="/bookings" icon={<BookIcon />}>
					Bookings
				</NavLink>
				<NavLink to="/cabins" icon={<HomeIcon />}>
					Cabins
				</NavLink>
				<NavLink to="/settings" icon={<Settings />}>
					Settings
				</NavLink>
				<NavLink to="/account" icon={<LockIcon />}>
					Account
				</NavLink>
				<NavLink to="/" icon={<User />}>
					Users
				</NavLink>
			</ul>
		</div>
	)
}

interface NavLinkProps {
	to: string
	icon?: React.ReactNode // Optional prop for icon
	children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children }) => {
	return (
		<li>
			<Link
				className="flex items-center gap-x-3 rounded-md px-10 py-3 text-lg transition duration-300 ease-in-out hover:bg-[#111827] hover:text-yellow-500"
				to={to}
			>
				{icon}
				{children}
			</Link>
		</li>
	)
}

export default NavLink
