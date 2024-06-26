import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-20 items-center space-x-4 text-amber-500 sm:justify-between sm:space-x-0">
				<div className="flex flex-1 items-center justify-end space-x-3">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>TN</AvatarFallback>
					</Avatar>
					<Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
						<div
							className={buttonVariants({
								size: "icon",
								variant: "ghost",
							})}
						>
							<Icons.gitHub className="h-5 w-5" />
							<span className="sr-only">GitHub</span>
						</div>
					</Link>
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
