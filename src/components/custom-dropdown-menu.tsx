import * as React from "react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function CustomDropdownMenu({
	children,
	isOpen,
	setIsOpen,
}: {
	children: React.ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuContent align="end" className="z-50 w-[120px]">
				<DropdownMenuItem className="group flex w-full items-center justify-between p-0 text-left text-sm">
					{children}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
